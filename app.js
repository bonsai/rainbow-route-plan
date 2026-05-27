(function () {
  'use strict'

  /* ─── DOM ─── */
  const video  = document.getElementById('camera')
  const canvas = document.getElementById('scan-canvas')
  const ctx    = canvas.getContext('2d')
  const status = document.getElementById('status')
  const guide  = document.getElementById('guide')
  const startBtn = document.getElementById('start-btn')

  /* ─── State ─── */
  let scanning = false
  let lastScanned = ''
  let graph = null
  let synth = window.speechSynthesis

  let lastNodeId = null
  let path = null
  let pathIndex = 0
  let currentEdge = null
  let edgeStartedAt = 0
  let userType = 'blind'
  let destinationId = null
  let edgeTimer = null

  const WALK_SPEED_MPS = 1.2

  /* ─── Load station graph ─── */
  function loadGraph (name) {
    const entry = STATION_INDEX[name]
    if (!entry) return null
    const raw = window[entry.ref]
    if (!raw) return null
    const nodeMap = {}
    for (const n of raw.nodes) nodeMap[n.id] = n
    return { raw, nodeMap }
  }

  /* ─── Dijkstra ─── */
  function findRoute (fromId, toId) {
    const nodes = graph.raw.nodes
    const edges = graph.raw.edges
    const adj = {}
    for (const n of nodes) adj[n.id] = []
    for (const e of edges) {
      if (!adj[e.from]) adj[e.from] = []
      if (!adj[e.to]) adj[e.to] = []
      adj[e.from].push(e)
      adj[e.to].push({ from: e.to, to: e.from, distance_m: e.distance_m, slope_deg: e.slope_deg, props: e.props, level_change: e.level_change })
    }

    const dist = {}, prev = {}, visited = new Set()
    for (const n of nodes) dist[n.id] = Infinity
    dist[fromId] = 0

    while (visited.size < nodes.length) {
      let u = null, minD = Infinity
      for (const n of nodes) {
        if (!visited.has(n.id) && dist[n.id] < minD) {
          minD = dist[n.id]; u = n.id
        }
      }
      if (!u || u === toId) break
      visited.add(u)

      for (const e of adj[u]) {
        const v = e.to === u ? e.from : e.to
        if (visited.has(v)) continue
        let weight = e.distance_m
        if (userType === 'wheelchair' && e.props.wheelchair === false) weight += 9999
        if (userType === 'robot' && e.props.robot === 'caution') weight += 500
        if (userType === 'wheelchair' && e.props.wheelchair === 'easy') weight *= 0.5
        if (userType === 'blind' && e.props.blind_navigation === 'tactile_block') weight *= 0.3
        if (e.level_change) weight += 20
        if (e.props.crowd_level === 'high') weight += 100
        if (e.props.crowd_level === 'medium') weight += 30
        const alt = dist[u] + weight
        if (alt < dist[v]) { dist[v] = alt; prev[v] = u }
      }
    }

    if (dist[toId] === Infinity) return null
    const route = []
    let cur = toId
    while (cur && cur !== fromId) { route.unshift(cur); cur = prev[cur] }
    route.unshift(fromId)
    return route
  }

  /* ─── Find edge between two nodes ─── */
  function getEdge (from, to) {
    for (const e of graph.raw.edges) {
      if ((e.from === from && e.to === to) || (e.from === to && e.to === from)) return e
    }
    return null
  }

  /* ─── Get outgoing edges from a node ─── */
  function getOutgoingEdges (nodeId) {
    return graph.raw.edges.filter(e => e.from === nodeId || e.to === nodeId)
  }

  /* ─── Describe edge ─── */
  function describeEdge (edge, toNode) {
    const parts = []
    if (edge.level_change) {
      parts.push(`${toNode.label}で${toNode.level}へ移動します。`)
      return parts.join('')
    }
    const dirs = ['まっすぐ', '右に', '左に', '右に', '左に']
    const dir = dirs[pathIndex % dirs.length]
    parts.push(`${dir}進みます。${edge.distance_m}メートルです。`)

    if (edge.props.surface) parts.push(`床は${edge.props.surface}。`)
    if (edge.props.slope_deg > 5) parts.push(`傾斜${edge.props.slope_deg}度。`)
    if (edge.props.width_m && edge.props.width_m < 1.2) parts.push(`幅${edge.props.width_m}メートル。`)
    if (edge.props.crowd_level === 'high') parts.push('混雑しています。')
    if (userType === 'wheelchair' && edge.props.wheelchair === 'easy') parts.push('車椅子で進みやすいです。')
    if (userType === 'blind' && edge.props.blind_navigation === 'tactile_block') parts.push('点字ブロックがあります。')

    parts.push(`到着目安は${Math.round(edge.distance_m / WALK_SPEED_MPS)}秒です。`)
    return parts.join('')
  }

  /* ─── Speak ─── */
  function speak (text, onend) {
    if (!text) return
    synth.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'ja-JP'
    u.rate = 0.9
    u.pitch = 1.0
    guide.innerHTML = `▶ <span id="arrow">→</span> ${text}`
    document.body.classList.add('speaking')
    u.onend = () => {
      document.body.classList.remove('speaking')
      if (onend) onend()
    }
    synth.speak(u)
  }

  /* ─── Advance to next edge in path ─── */
  function advanceEdge () {
    if (!path || pathIndex >= path.length - 1) {
      const dest = graph.nodeMap[destinationId]
      speak(`目的地、${dest ? dest.label : '到着'}に到着しました。`)
      path = null; currentEdge = null; lastNodeId = null
      status.textContent = '✅ 到着しました。QRで新しい案内を開始できます。'
      return
    }

    const fromId = path[pathIndex]
    const toId = path[pathIndex + 1]
    const edge = getEdge(fromId, toId)
    const toNode = graph.nodeMap[toId]

    if (!edge) {
      status.textContent = `⚠ 経路断絶: ${fromId} → ${toId}`
      return
    }

    currentEdge = edge
    lastNodeId = fromId
    edgeStartedAt = Date.now()
    status.textContent = `📍 ${graph.nodeMap[fromId].label} → ${toNode.label} (${edge.distance_m}m)`

    const speech = describeEdge(edge, toNode)
    speak(speech, () => startEdgeTimer(edge, toId))
  }

  /* ─── Edge progress timer ─── */
  function startEdgeTimer (edge, toId) {
    clearInterval(edgeTimer)
    const estimatedMs = (edge.distance_m / WALK_SPEED_MPS) * 1000
    const checkInterval = Math.min(estimatedMs * 0.5, 15000)

    edgeTimer = setInterval(() => {
      const elapsed = Date.now() - edgeStartedAt
      const progress = Math.min(elapsed / estimatedMs, 1)
      const barLen = 20
      const filled = Math.round(barLen * progress)
      const bar = '█'.repeat(filled) + '░'.repeat(barLen - filled)

      if (progress >= 1) {
        clearInterval(edgeTimer)
        const toNode = graph.nodeMap[toId]
        speak(
          `${toNode ? toNode.label : '次の地点'}に到着したと思われます。到着したらQRをスキャンするか、到着しましたと言ってください。`
        )
        return
      }

      if (progress > 0.5 && Math.random() < 0.1) {
        speak('順調です。そのまま進んでください。')
      }

      status.textContent = `🚶 ${Math.round(progress * 100)}% ${bar}`
    }, Math.max(checkInterval, 3000))
  }

  /* ─── Confirm arrival at node ─── */
  function confirmArrival (nodeId) {
    clearInterval(edgeTimer)
    if (!path || !nodeId) return

    const expectedNext = path[pathIndex + 1]
    if (nodeId === expectedNext) {
      pathIndex++
      status.textContent = `✅ ${graph.nodeMap[nodeId].label} 確認`
      setTimeout(() => advanceEdge(), 1500)
    } else {
      const node = graph.nodeMap[nodeId]
      speak(
        `${node ? node.label : '現在地'}は経路上の次の地点ではありません。経路を再計算します。`
      )
      recalcPath(nodeId)
    }
  }

  /* ─── Recalculate path from current node ─── */
  function recalcPath (fromId) {
    if (!destinationId) {
      status.textContent = '⚠ 目的地が設定されていません。QRをスキャンしてください。'
      return
    }
    path = findRoute(fromId, destinationId)
    if (!path) {
      speak('経路が見つかりませんでした。別の場所でQRをスキャンしてください。')
      return
    }
    pathIndex = 0
    const fromNode = graph.nodeMap[fromId]
    speak(`経路を再計算しました。${fromNode ? fromNode.label : '現在地'}から案内を再開します。`)
    setTimeout(() => advanceEdge(), 2000)
  }

  /* ─── Resolve QR location_id ─── */
  function resolveLocation (locationId) {
    const node = graph.nodeMap[locationId]
    if (!node) {
      status.textContent = `⚠ 不明: ${locationId}`
      speak(`位置ID ${locationId} はデータにありません。`)
      return null
    }

    if (path && lastNodeId) {
      confirmArrival(locationId)
      return node
    }

    lastNodeId = locationId
    const exitNode = graph.raw.nodes.find(n => n.type === 'exit')
    const elevatorNode = graph.raw.nodes.find(n => n.type === 'elevator' && n.level === node.level)
    const target = exitNode || elevatorNode
    if (!target) {
      speak(`${node.label}です。この場所からは目的地が見つかりませんでした。`)
      return node
    }

    destinationId = target.id
    path = findRoute(locationId, destinationId)
    if (!path) {
      speak(`${node.label}から目的地への経路が見つかりません。`)
      return node
    }

    pathIndex = 0
    status.textContent = `📍 ${node.label} → ${target.label} (${path.length - 1}区間)`
    speak(`${node.label}です。${target.label}まで${path.length - 1}区間を案内します。`)
    setTimeout(() => advanceEdge(), 2000)
    return node
  }

  /* ─── QR scan loop ─── */
  async function scanLoop () {
    if (!scanning) return
    try {
      const detector = new BarcodeDetector({ formats: ['qr_code'] })
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      ctx.drawImage(video, 0, 0)
      const barcodes = await detector.detect(canvas)
      for (const b of barcodes) {
        const raw = b.rawValue.trim()
        if (raw === lastScanned) continue
        lastScanned = raw
        status.textContent = `📌 QR: ${raw}`
        resolveLocation(raw)
      }
    } catch (e) {
      if (e.name === 'NotSupportedError' || e.name === 'SecurityError') {
        status.textContent = '⚠ BarcodeDetector 非対応。Chrome Android 推奨。'
        scanning = false
        return
      }
    }
    requestAnimationFrame(scanLoop)
  }

  /* ─── Camera start ─── */
  async function startCamera () {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 480 } }
      })
      video.srcObject = stream
      await video.play()
      startBtn.classList.add('hidden')
      graph = loadGraph(ACTIVE_STATION)
      status.textContent = '📷 QR コードを写してください'
      guide.innerHTML = '<span class="dim">最初のQRをスキャンすると案内を開始します</span>'
      scanning = true
      scanLoop()
    } catch (e) {
      status.textContent = `⚠ カメラエラー: ${e.message}`
      if (e.name === 'NotAllowedError') {
        guide.innerHTML = '<span class="dim">カメラの許可が必要です</span>'
      }
    }
  }

  /* ─── Manual "arrived" trigger (tap/click) ─── */
  document.addEventListener('click', () => {
    if (currentEdge && path) {
      const toId = path[pathIndex + 1]
      confirmArrival(toId)
    }
  })

  /* ─── Init ─── */
  if (!('BarcodeDetector' in window)) {
    status.textContent = '⚠ このブラウザは QR 検出に対応していません。Chrome Android 推奨。'
  }

  startBtn.addEventListener('click', startCamera)

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {})
  }
})()
