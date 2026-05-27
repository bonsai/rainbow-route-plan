# ADR-001: 技術スタック選定

## ステータス

提案

## コンテキスト

Rainbow Route は、QR をデジタルツインへの入り口とし、物理ノードから最適エッジを瞬時に提供するエッジノード転送レイヤーを中核とする。

求められる要件：

1. **Web で動作する** — インストール不要、URL ひとつで使える
2. **PWA 対応** — オフラインでも動作、Service Worker でキャッシュ
3. **軽量** — 初回ロードは秒単位、バンドルサイズは最小限
4. **高速** — QR スキャンから最適エッジ提供まで 100ms 未満
5. **1 機能だけ** — 「トランスファーのエッジノードレイヤー」のみを提供。UI は最小限

検討した言語・ランタイム：

| 言語 | Web実行 | 速度 | バンドルサイズ | WASM | 学習コスト |
|------|---------|------|---------------|------|-----------|
| TypeScript | ◎ ネイティブ | △ JIT依存 | △~○ | ○ | 低 |
| Rust → WASM | ◎ wasm-pack | ◎ AOT最適化 | ○ 最小限 | ◎ ファーストクラス | 中〜高 |
| C++ → WASM | ◎ emscripten | ◎ | ○ | ◎ | 高 |
| Java → WASM | △ teaVM等 | ○ | × ランタイム大 | △ | 中 |
| Go → WASM | ◎ | ○ | × ランタイム大 | ○ | 低 |

## 決定

**コアエンジン（エッジノード転送レイヤー）を Rust → WASM で記述し、UI/PWA ラッパーを TypeScript で記述する。**

```
┌──────────────────────────────────┐
│   TypeScript (PWA)               │
│   ┌────────────────────────────┐ │
│   │ Rust → WASM (コアエンジン) │ │
│   │ ・.jsonsg グラフ読み込み   │ │
│   │ ・ノード同定               │ │
│   │ ・最適エッジ探索           │ │
│   │ ・経路計算                 │ │
│   └────────────────────────────┘ │
│   UI / Service Worker / Camera   │
└──────────────────────────────────┘
```

### Rust/WASM 層（エッジノード転送レイヤー）

これが提供するもの：

- `.jsonsg` のパースとグラフ構築
- QR から得たノード ID の同定（O(1) ハッシュマップ）
- 移動者種別ごとの最適エッジ探索（A* / Dijkstra）
- 経路のシリアライズ（JSON）
- **UI は持たない。純粋に転送レイヤーとしてのみ機能する**

API 面：

```rust
// これだけ
pub fn load_graph(jsonsg: &str) -> Result<SpatialGraph, Error>;
pub fn find_route(graph: &SpatialGraph, from: &str, to: Option<&str>, user_type: UserType) -> Result<Route, Error>;
pub fn resolve_node(graph: &SpatialGraph, qr_id: &str) -> Result<NodeInfo, Error>;
```

バンドルサイズ目標：**gzip 50KB 未満**

### TypeScript 層（PWA）

これが提供するもの：

- PWA マニフェスト + Service Worker（オフラインキャッシュ）
- カメラ / QR スキャナー（`navigator.mediaDevices`）
- Rust/WASM モジュールのロードとバインディング
- 音声ガイド出力（Web Speech API）
- 最小限の UI（「QRをスキャン」ボタン＋ステータス表示）

### 採用しないもの

| 候補 | 不採用理由 |
|------|-----------|
| Java → WASM | teaVM / J2CL は実績が薄く、ランタイムサイズが大きい。エッジノード転送レイヤーにはオーバースペック |
| C++ → WASM | 可能だが、wasm-pack のエコシステムが Rust より成熟。安全性でも Rust が優位 |
| Pure TypeScript | グラフ探索のパフォーマンスが JIT 依存になる。100ms 制約を満たせる保証がない |
| Go → WASM | ランタイムサイズが数百 KB あり、50KB 目標に合わない |

## 結果

### メリット

- WASM によるネイティブ級のパフォーマンス（AOT コンパイル済み）
- Rust のメモリ安全性（use-after-free 等が起きない）
- wasm-pack / wasm-bindgen による TS とのバインディングが充実
- バンドルサイズが小さい（最適化済み WASM は 20〜50KB）
- PWA によりオフラインでも QR → エッジ提供が可能
- Web Speech API で音声ガイドが追加実装不要

### デメリット

- Rust の学習コスト（チームに Rust 経験者が必要）
- WASM からの DOM 操作は不可能（UI は TS 側）
- 開発環境のセットアップがやや複雑（wasm-pack / wasm-opt 等）

### トレードオフ

**「軽さ」と「速度」を取るなら Rust → WASM。**
**「開発速度」を取るなら Pure TypeScript。**

Rainbow Route のコアバリューは「QR 1 回スキャン → 最適エッジ瞬時提供」の体感速度にある。
したがって、初期コストを払って Rust → WASM を選ぶ。

## 今後の検討

- エッジノード転送レイヤーが確立した後のバックエンド API サーバは Java / Rust の選択肢がある
- Apple / Android ネイティブアプリが必要になった場合、コアエンジンは WASM のまま各プラットフォームに埋め込める
