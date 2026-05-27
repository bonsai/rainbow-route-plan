# navigator.xr リサーチ — WebXR Device API

## 調査日
2026-05-26

---

## 1. 概要

`navigator.xr` は W3C Immersive Web Working Group が策定する WebXR Device API のエントリポイント。ブラウザ上で VR/AR 体験を提供する。

Rainbow Route では「レイヤーメガネ」の実現手段として WebXR AR モード（`immersive-ar`）の採用を検討する。

---

## 2. ブラウザサポート状況（2026年Q1時点）

| ブラウザ | VR | AR | 備考 |
|----------|----|----|------|
| Chrome Android | ✅ v79~ | ✅ v81~ | ARCore ベース。Rainbow Route の主力ターゲット |
| Chrome Desktop | ✅ v79~ | ❌ | カメラなしのため AR 不可 |
| Edge | ✅ v79~ | HoloLens 2 のみ | デスクトップでは AR 不可 |
| Safari iOS | ❌ | ❌ | AR は Quick Look（USDZ）のみ。**WebXR AR 非対応** |
| Safari visionOS | ✅ (flag) | ✅ (flag) | Apple Vision Pro。要フラグ有効 |
| Firefox / Firefox Android | ❌ | ❌ | バグトラッキング中（bugzil.la/1419190） |
| Samsung Internet | ✅ v12~ | ✅ v12.1~ | Android 端末で利用可能 |
| Meta Quest Browser | ✅ | ✅ パススルーAR | VR ヘッドセット |
| Android XR | ✅ | ✅ | Android XR デバイス標準 |

**結論：実質的なターゲットは Chrome Android（ARCore）と Samsung Internet。iOS Safari は非対応。**

---

## 3. セッションモード

```ts
enum XRSessionMode {
  "inline",       // 通常のページ内。没入感なし
  "immersive-vr", // VR。ユーザーの環境は見えない
  "immersive-ar"  // AR。現実環境に重ねる ⬅ Rainbow Route はこれ
}
```

### immersive-ar の特性
- カメラ映像にレンダリングを重ねる（alpha-blend）
- phone ではフルスクリーン遷移（`requestFullscreen` 類似）
- ユーザージェスチャ（click / touch）が必須
- `navigator.xr.isSessionSupported('immersive-ar')` で事前確認

---

## 4. 基本フロー

```ts
// 1. 対応確認
const supported = await navigator.xr.isSessionSupported('immersive-ar')
if (!supported) fallbackToAudioMode()

// 2. セッション要求（ユーザージェスチャ内で呼ぶ）
const session = await navigator.xr.requestSession('immersive-ar', {
  requiredFeatures: ['hit-test', 'local']
})

// 3. レンダリング設定
const gl = canvas.getContext('webgl', { xrCompatible: true })
session.updateRenderLayer({ baseLayer: new XRWebGLLayer(session, gl) })

// 4. 参照空間
const refSpace = await session.requestReferenceSpace('local')

// 5. アニメーションループ
const onFrame = (time, frame) => {
  const pose = frame.getViewerPose(refSpace)
  // ポーズに基づいてノード・エッジを描画
  // ヒットテストで床面検出
  session.requestAnimationFrame(onFrame)
}
session.requestAnimationFrame(onFrame)
```

---

## 5. Rainbow Route に必要な WebXR モジュール

| モジュール | 必須度 | 用途 |
|------------|--------|------|
| AR Module（immersive-ar） | 必須 | カメラ映像にグラフ重ね |
| Hit Test | 高 | 床面・壁面を検出しノードを実空間に定着 |
| Anchors | 高 | QR 読み取り位置を永続的に保持 |
| Light Estimation | 中 | 屋内照明に合わせたノードの明るさ調整 |
| Depth Sensing | 低 | 通路の奥行き把握（将来） |

---

## 6. 制約・注意点

### 6.1 Safari iOS が非対応
- iPhone ユーザーは **WebXR AR を使えない**
- 対策：`isSessionSupported()` で fallback → オーディオモードに自動切替

### 6.2 Secure Context 必須
- HTTPS（または localhost）でなければ `navigator.xr` は undefined
- PWA も HTTPS 前提なので問題ない

### 6.3 ユーザージェスチャ必須
- `requestSession()` は click / touch イベント内で呼ぶ必要がある
- ページ読み込み時に自動起動は不可
- Rainbow Route では「ARを開始」ボタンを必須とする

### 6.4 カメラ許可
- 初回はブラウザの許可ダイアログが表示される
- ドメインごとに永続化される
- 拒否された場合はオーディオモードにフォールバック

### 6.5 バッテリー消費
- AR セッションは GPU/Camera を継続使用
- 実測で 30fps 維持時の消費電力は約 300〜500mW（Pixel 7）
- 連続使用は 1 時間以内を推奨

---

## 7. 対応デバイス戦略

| デバイス | AR | 音声 | フォールバック |
|----------|----|------|---------------|
| Android Chrome | ✅ 最適 | ✅ | — |
| Samsung Internet | ✅ | ✅ | — |
| iPhone Safari | ❌ | ✅ | 音声モードへ自動切替 |
| Desktop Chrome | ❌ | ✅ | 音声モードへ自動切替 |
| Meta Quest | ✅ パススルー | ✅ | — |
| Apple Vision Pro | ✅ (flag) | ✅ | — |

**Rainbow Route の方針：AR が使えても使えなくても、音声ガイドは常に動作する。AR は追加のレイヤー。**

---

## 8. 参考リソース

- W3C 仕様: https://immersive-web.github.io/webxr
- AR モジュール仕様: https://www.w3.org/TR/webxr-ar-module-1/
- MDN: https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API
- ARCore WebXR ガイド: https://developers.google.com/ar/develop/webxr
- 互換性テーブル: https://immersive-web.github.io/webxr-samples/report/
- Can I Use: https://caniuse.com/webxr
- Android XR WebXR: https://developer.android.com/develop/xr/web
- WebXR Samples: https://immersive-web.github.io/webxr-samples/
- 2026 年 WebXR 生産性レポート: https://born.mt/insights/webxr-standards-2026/
