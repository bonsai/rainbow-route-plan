# ノード階層性 — エレベータを頂点とするデータ設計

## 1. 核心

**究極的に、エレベータの位置さえわかればいい。**

すべての移動者にとって、階層をまたぐ唯一の手段はエレベータである。
車椅子・ベビーカー・スーツケース・ロボット・高齢者・盲導犬ユーザー。
全員がエレベータに依存する。

したがって、.jsonsg のノードには**暗黙の階層**が存在する。

---

## 2. ノード階層図

```
Tier 1:  ELV (エレベータ)
            │
Tier 2:  GATE (改札) ── EXIT (出口)
            │              │
Tier 3:  HALL (コンコース) ── JUNCTION (交差点)
            │
Tier 4:  INFO (案内所) ── ROOM (店舗・トイレ)
            │
Tier 5:  TACTILE (点字ブロック) ── STAIRS (階段)
```

### Tier 1 — エレベータ（階層移動の唯一の手段）

```json
{
  "id": "ELV-JR-E",
  "type": "elevator",
  "props": { "wheelchair": true, "robot": true }
}
```

- 単一のエレベータは複数階にまたがるノード群として表現する
- `ELV-JR-E` → `ELV-JR-E-B1` → `ELV-JR-E-B2` のように、level_change = true のエッジで接続
- **すべての経路は、原則としてエレベータを経由する**

### Tier 2 — 改札・出口（空間への出入り口）

```json
{ "id": "JR-GATE-E", "type": "gate" }
{ "id": "EXIT-EAST",  "type": "exit"  }
```

- 改札は「駅空間」への入口
- 出口は「駅空間」からの出口
- 経路の始点または終点になる
- 改札とエレベータの間は Tier 3 のコンコースが接続する

### Tier 3 — コンコース・交差点（経路の骨格）

```json
{ "id": "CONCOURSE-E", "type": "hall" }
{ "id": "PLAT-JR",     "type": "junction" }
```

- エレベータと改札・出口の間を接続する、通路の分岐点
- `props.width_m` で幅を持たせ、車椅子・ロボットの通過可否を判定する
- 単なる「つなぎ」のノード。単独では目的地にならない

### Tier 4 — 案内所・トイレ・店舗（付加的目的地）

```json
{ "id": "TOILET-WC-E", "type": "room" }
{ "id": "INFO-JR-E",   "type": "info" }
```

- 経路上のオプション目的地
- 経路探索の「目的地」として指定されることはあるが、経路の骨格にはならない
- 常に Tier 3 のノードからエッジが伸びる形で表現する

### Tier 5 — 点字ブロック・階段（移動者固有の補助情報）

```json
{ "id": "TACTILE-JR-E", "type": "tactile" }
{ "id": "STAIRS-JR-E",  "type": "stairs", "props": { "wheelchair": false } }
```

- **これらは経路を構成しない。エッジの属性として表現すべき。**
- 点字ブロックはエッジの `blind_navigation: "tactile_block"` で十分
- 階段はエッジの `wheelchair: false` で表現できる
- ノード化するのは、分岐点など位置の特定が必要な場合のみ

---

## 3. データ設計への示唆

### 3.1 ノードは最小限に

本当に必要なノードは以下のみ：

```
エレベータ（各階）
改札
出口
コンコース（必要最小限の分岐点）
```

点字ブロック・階段は**基本的にエッジの属性として表現する。**

### 3.2 エッジに情報を集中させる

```
エッジが持つ属性：
├─ wheelchair: boolean | "easy"  ← これが階段相当
├─ blind_navigation: "tactile_block"  ← これが点字ブロック
├─ slope_deg: number  ← スロープかどうか
├─ width_m: number
├─ surface: string
├─ crowd_level: string
├─ robot: boolean | "safe" | "caution"
└─ baby_stroller: "easy"
```

Tier 5 のノードを削減し、代わりにエッジの属性で表現する。

### 3.3 経路探索は 3 区間に帰着する

```
現在地 → 最寄りエレベータ → 目的階エレベータ → 目的地
│          │                  │                 │
│          Tier 3→1           │                 │
│                             Tier 1（階層間）  │
│                                               │
│          Tier 1→3                            │
```

すべての経路はこの 3 区間で表現できる。
各区間のエッジ属性を検査するだけで、多様な移動者に対応できる。

---

## 4. 実装への示唆

### 4.1 エレベータ・ファーストの経路探索

```js
function findRouteElevatorFirst(fromId, toId) {
  const fromNode = nodeMap[fromId]
  const toNode = nodeMap[toId]

  // 同じ階なら直接エッジ探索
  if (fromNode.level === toNode.level) {
    return directPath(fromId, toId)
  }

  // 異なる階なら、必ずエレベータ経由
  const fromElv = nearestElevator(fromId, fromNode.level)
  const toElv = nearestElevator(toId, toNode.level, fromElv.refId)
  return [
    ...pathToElevator(fromId, fromElv),
    ...pathBetweenLevels(fromElv, toElv),
    ...pathFromElevator(toElv, toId)
  ]
}
```

### 4.2 エレベータ位置が最優先のデータ整備

駅データを作るときの優先順位：

```
1. エレベータの位置と各階のノード → 最優先
2. 改札・出口の位置 → 次優先
3. コンコースの分岐点 → 必要に応じて
4. 案内所・トイレ → オプション
5. 点字ブロック・階段 → エッジ属性で代替
```

---

## 5. まとめ

> **エレベータが都市のダンジョンにおける「転移点」である。**
> すべての経路はエレベータを中心に設計し、
> その他の情報はエッジの属性として付加する。
>
> これによりデータは最小化され、
> 経路探索は高速化され、
> 多様な移動者すべてに対応できる。
