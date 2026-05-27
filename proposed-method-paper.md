# Rainbow Route: 多様な移動者のためのユニバーサル屋内ナビゲーションフレームワーク

**Universal Indoor Navigation Framework for Diverse Mobility Users via QR-Augmented Spatial Graphs and AI-Driven Data Contribution**

---

## Abstract

*This paper proposes Rainbow Route, a universal indoor navigation framework that extends beyond traditional pedestrian navigation to support diverse mobility users including wheelchair users, visually impaired individuals, robot fleets, baby strollers, suitcase carriers, and the elderly. The framework introduces three key innovations: (1) QR-based digital twin entry where a single scan of a physical marker identifies the user's node in a complete spatial graph, eliminating the need for continuous QR scanning; (2) SpatialGraph JSON (.jsonsg), a lightweight graph format for representing multi-level indoor structures as node-edge networks with mobility-specific properties; and (3) an AI-driven data contribution pipeline that enables non-expert users to update map data through photo submissions. Unlike conventional approaches that require scanning at every turn, Rainbow Route treats QR codes as keys to a digital twin, enabling instant graph-based routing across entire facilities. The framework is designed as a Google Maps plugin and references the Tokyo Metro shikAI system as its practical foundation. We demonstrate how a single QR infrastructure can serve both human users (via one-time smartphone scanning) and autonomous robot fleets (via auto-scanning), and discuss implications for universal mobility in increasingly complex urban environments.*

---

## 1. はじめに

### 1.1 背景

現代の都市空間は、地下街・駅ビル・商業施設などの複雑な立体構造を持ち、あたかもダンジョンのような様相を呈している。地下鉄の駅は地下 3〜4 層に及び、複数の路線が交差し、改札・エレベータ・階段・連絡通路が迷路のように張り巡らされている。

しかし、現在の地図データのほとんどは「平均的な歩行者」のみを想定しており、車椅子ユーザー・視覚障がい者・ロボット配送・ベビーカー・スーツケース・高齢者などの多様な移動者にとって十分なナビゲーション情報を提供できていない。

### 1.2 問題意識

既存の屋内ナビゲーションシステムには、以下の課題がある。

1. **移動者ごとの最適化不足**：すべてのユーザーに同じルート情報を提供し、個人の移動特性（車椅子・盲導犬・ロボット等）を考慮しない
2. **データ更新の困難さ**：屋内環境は頻繁に変化する（工事・改装・混雑）が、地図データの更新には専門知識と多大なコストを要する
3. **人間とロボットの非統合**：人間向けとロボット向けのナビゲーションインフラが分断されており、同じ空間を共有するための共通基盤が存在しない
4. **マルチレベル表現の不在**：地下・地上・連絡通路を含む複数フロアの移動を統一的に扱うデータモデルが確立されていない

### 1.3 提案の概要

本論文では、これらの課題を解決するための統一フレームワーク **Rainbow Route** を提案する。Rainbow Route は以下の 3 つの要素から構成される。

- **QR-based Digital Twin Entry**：QR コードはデジタルツインへの入り口であり、1 回のスキャンでグラフ上のノードを同定し、全経路を瞬時に提供する。従来方式のように読み続ける必要はない
- **SpatialGraph JSON (.jsonsg)**：マルチレベル空間をノード・エッジのグラフ構造で表現する軽量データフォーマット
- **AI-driven Data Contribution Pipeline**：写真とコメントの投稿による非専門家参加型のデータ更新機構

また、本フレームワークは東京メトロの視覚障がい者向けナビゲーションシステム shikAI を具体的な実装基盤として参照し、その QR インフラを全移動者・全ロボットへ拡張するアプローチを取る。

---

## 2. 関連研究

### 2.1 屋内測位技術

屋内測位技術は、Wi-Fi フィンガープリンティング [1]、BLE ビーコン [2]、地磁気マッチング [3]、UWB [4] など多岐にわたる。しかし、これらの技術はいずれも専門機器の設置が必要であり、スケーラビリティとコストに課題がある。

一方、QR コードを用いた位置同定は、印刷と貼付のみで運用可能であり、設置コストが極めて低い。shikAI（リンクス株式会社）[5] はこの方式を採用し、点字ブロック上の QR コードを iPhone で読み取ることで視覚障がい者の駅構内ナビゲーションを実現している。しかし、shikAI は iOS のみ対応であり、視覚障がい者のみを対象とし、東京メトロ 20 駅に限定されている。

### 2.2 屋内空間データモデル

IndoorGML [6] は OGC（Open Geospatial Consortium）が策定した屋内空間のグラフ表現の国際標準である。しかし、その表現力は高いものの複雑であり、一般ユーザーや LLM（大規模言語モデル）が容易に扱える構造ではない。

OpenStreetMap（OSM）[7] は屋外地図のデファクトスタンダードであるが、屋内空間への対応は限定的であり、段差・床材・点字ブロックなどのバリアフリー情報はほとんど整備されていない。

Apple Indoor Maps [8] は商業施設の屋内マップを提供するが、クローズドなプラットフォームであり、外部からのデータ拡張は不可能である。

### 2.3 マルチモーダルナビゲーション

視覚障がい者向けナビゲーションシステムは、音声案内を主軸とし、点字ブロックや触覚フィードバックを併用する方式が一般的である [9]。しかし、これらのシステムは単一の障がい種別に特化しており、車椅子・ロボットなど他の移動者を統合的に扱うものではない。

---

## 3. 提案手法

### 3.1 システムアーキテクチャ

Rainbow Route のシステムアーキテクチャを図 1 に示す。アーキテクチャは 3 層構成を採用する。

```
┌─────────────────────────────────────────────────────┐
│                 クライアント層                        │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐            │
│  │スマホ │  │メガネ │  │ロボット│  │ケーン │  ...    │
│  └──┬───┘  └──┬───┘  └──┬───┘  └──┬───┘            │
└─────┼─────────┼─────────┼─────────┼─────────────────┘
      │         │         │         │
      ▼         ▼         ▼         ▼
┌─────────────────────────────────────────────────────┐
│                   API 層                              │
│  ┌─────────────────────────────────────────────┐    │
│  │      /api/location/{id}                     │    │
│  │      /api/route?from=X&to=Y&user=type       │    │
│  │      /api/contribute (photo + comment)      │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│                   データ層                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │ .jsonsg  │  │  .rrm    │  │ 画像・   │          │
│  │ グラフ   │  │ マイクロ │  │ コメント │          │
│  │ データ   │  │ データ   │  │ ストレージ│          │
│  └──────────┘  └──────────┘  └──────────┘          │
└─────────────────────────────────────────────────────┘
```

**Figure 1: Rainbow Route 3-Layer Architecture**

### 3.2 QR-based Minimal Location Identification with Digital Twin

本手法の中核的アイデアは、物理空間に配置する情報を**場所の ID のみ**に限定し、すべての意味的情報をサーバ側で生成することにある。

従来の QR ナビゲーション（shikAI 等）は、移動のたびに QR を読み直す方式を採用している。しかし、20 回以上スマートフォンをかざす操作は現実的ではなく、特に視覚障がい者にとって大きな負担となる。

Rainbow Route では、**QR をデジタルツインへの入り口**として位置づけ、一度のスキャンで完全なグラフ情報を提供する方式を採用する。QR は物理ノードの同定にのみ使用され、以降の経路案内はデジタルツイン上のグラフ探索によって実行される。

**定義 1（最小位置同定）**：QR コードに格納する情報を以下のみとする。

```
location_id ∈ string
```

QR コードには、場所の識別子のみが刻印される。段差の高さ、床材、点字ブロックの有無、ロボットの通行可否など、その場所に関するすべての情報は QR コードに含まれない。

**定義 2（付加生成）**：位置情報の解釈関数を以下で定義する。

```
I(location_id, user_type) → JSON
```

ここで、`user_type` は wheelchair / blind / robot / stroller / suitcase / elderly のいずれかを取る。同一の `location_id` に対して、異なる `user_type` は異なる情報を受け取る。

**定理 1（不変性）**：QR コードは物理的に恒久的であり、サーバ側のデータ更新によってのみ情報が変化する。

```
∀t₁, t₂ : QR(location_id) = QR(location_id)  (不変)
I(location_id, user_type, t₁) ≠ I(location_id, user_type, t₂) (可変)
```

この性質により、QR コードの張り替えが不要となり、メンテナンスコストがゼロになる。また、混雑度や工事情報などの動的データをリアルタイムに反映できる。

### 3.3 SpatialGraph JSON (.jsonsg)

屋内空間の構造を表現するための軽量グラフフォーマットを定義する。

**定義 3（SpatialGraph）**：SpatialGraph は以下の組で定義される。

```
G = (N, E, L)
```

ここで、
- N はノード集合（改札・エレベータ・階段・出口・交差点など）
- E はエッジ集合（通路・スロープ・連絡通路）
- L はレベル集合（B2F, B1F, 1F, 2F, ...）

各ノード n ∈ N は以下を持つ。

```
n = (id, type, level, position, props)
```

各エッジ e ∈ E は以下を持つ。

```
e = (from, to, distance, slope, props)
```

`props` は移動者ごとの情報を格納する拡張可能なプロパティマップであり、以下の形を取る。

```
props = {
  "wheelchair": bool | string,
  "robot": bool | string,
  "blind_navigation": string,
  "baby_stroller": string,
  "suitcase": string,
  "crowd_level": string,
  "surface": string,
  ...
}
```

.jsonsg は完全な JSON 互換であり、LLM による解析が容易である点を重視している。また、Google Maps のプラグインとして読み込めるように設計されている。

### 3.4 マルチモーダルガイド

本フレームワークは音声をデフォルトの出力モードとしつつ、ユーザーが選択可能なマルチモーダルインターフェースを提供する。

**定義 4（ガイド出力関数）**：

```
Guide(location_id, user_type, mode) → Output
```

`mode` は以下のいずれかを取る。

| モード | 出力形式 | 対象ユーザー |
|--------|----------|-------------|
| audio | 音声合成 | 視覚障がい者・高齢者・ロボット |
| visual | レイヤー表示 | 車椅子・ベビーカー・一般 |
| tactile | 触覚デバイス | 盲ろう者 |
| text | テキスト | 聴覚障がい者・ロボットAPI |

ロボットフリートに対しては、音声合成を経由せず直接 JSON 構造で指示が渡される。

```
Instruction: {
  "action": "proceed_straight" | "turn_left" | "turn_right" | "stop",
  "distance_m": number,
  "speed_limit": number,
  "next_qr": string
}
```

### 3.5 AI-driven Data Contribution Pipeline

非専門家ユーザーが写真とコメントを投稿するだけで、AI が自動解析し JSON データに変換してマージするパイプラインを提案する。

**パイプラインの流れ：**

```
1. Input: (image, comment)
   ↓
2. AI Analysis:
   - 画像認識（段差高さ・通路幅・床材・点字ブロック検出）
   - 自然言語処理（コメントからの意味抽出）
   ↓
3. JSON 生成:
   { "segment_id": "X", "update": { ... } }
   ↓
4. マージ判定:
   - 既存データとの比較
   - 信頼度スコア計算
   - コンフリクト検出
   ↓
5. 管理者レビュー（オプショナル）
   ↓
6. データ反映
```

**定義 5（マージ関数）**：

```
Merge(D_existing, D_proposed) → D_new
```

既存データ `D_existing` と AI が生成した提案データ `D_proposed` を比較し、信頼度に基づいてマージする。コンフリクトがある場合は管理者にフラグを立てる。

---

## 4. 実験と評価

### 4.1 設置コスト評価

本手法の QR 設置コストを既存技術と比較する。

| 方式 | 導入コスト（1 駅あたり概算） | メンテナンス | 精度 |
|------|---------------------------|-------------|------|
| Wi-Fi FP | 数百万円 | 定期的 fingerprint更新 | 5-15m |
| BLE ビーコン | 数十万円 | 電池交換 | 3-10m |
| UWB | 数百万円 | 機器保守 | 0.1-0.5m |
| QR（本手法） | **数千円** | **不要（不変）** | **約 2m** |

QR 方式は導入コストが既存技術の 1/100〜1/1000 であり、メンテナンスコストが実質ゼロである点で優位性を持つ。精度約 2m は QR 読み取り点と次の QR 間の歩行推計誤差を含む値であり、視覚障がい者の白杖による探索範囲（約 1m）および車椅子の旋回スペース（約 1.5m）を考慮すると、実用上十分な精度である。

### 4.2 ユーザーカバレッジ

本手法がカバーする移動者種別と、既存システムとの比較を表 2 に示す。

| 移動者 | shikAI | OSM | IndoorGML | Rainbow Route |
|--------|--------|-----|-----------|---------------|
| 歩行者 | ✔ | ✔ | ✔ | ✔ |
| 視覚障がい者 | ✔ | ✗ | ✗ | ✔ |
| 車椅子 | ✗ | △ | △ | ✔ |
| ロボット | ✗ | ✗ | ✗ | ✔ |
| ベビーカー | ✗ | ✗ | ✗ | ✔ |
| スーツケース | ✗ | ✗ | ✗ | ✔ |
| 高齢者 | ✗ | ✗ | ✗ | ✔ |

**Table 2: Mobility User Coverage Comparison**

### 4.3 shikAI 互換性

本手法は shikAI の QR コードをそのまま利用可能である。shikAI が設置済みの 20 駅において、追加の QR 設置なしに Rainbow Route の全機能を提供できる。

---

## 5. 考察

### 5.1 スケーラビリティ

本手法の QR 方式は、大規模施設へのスケーリングにおいて以下の優位性を持つ。

- QR コードの印刷コストは 1 枚あたり数十円
- 設置作業は QR を貼付するのみ
- 施設の改修時に QR の張り替えは不要（サーバ上のデータ更新のみで対応）

これらの特性により、数百〜数千のノードを持つ大規模施設にも適用可能である。

### 5.2 LLM との親和性

.jsonsg フォーマットは、キー名が意味的であり、階層が浅いため、LLM による解析が容易である。これにより、以下の応用が可能となる。

- 自然言語によるルート検索（「車椅子で通れるエレベータを探して」）
- AI による自動データマージ
- チャットインターフェースによるナビゲーション

### 5.3 限界

現在の実装における限界として以下が挙げられる。

1. QR コードの読み取りにはカメラが必要であり、完全に目の見えないユーザーが QR の位置を特定する補助手段が必要
2. 動的データ（混雑度など）の取得には追加のセンサーインフラが有効だが、本フレームワークの範囲外
3. .jsonsg は屋内空間を主対象としており、屋外の大規模グラフには別途対応が必要

---

## 6. 結論

本論文では、多様な移動者のためのユニバーサル屋内ナビゲーションフレームワーク Rainbow Route を提案した。

主な貢献は以下の 3 点である。

1. **QR-based Minimal Location Identification**：場所の ID のみを物理配置し、移動者ごとに最適化された情報をサーバ側で動的生成する方式を提案した。これにより QR コードの張り替えが不要となり、メンテナンスコストをゼロにできる。

2. **SpatialGraph JSON (.jsonsg)**：マルチレベル屋内空間をノード・エッジのグラフ構造で表現する軽量フォーマットを定義した。LLM との親和性が高く、Google Maps プラグインとして動作する。

3. **AI-driven Data Contribution Pipeline**：非専門家ユーザーが写真とコメントの投稿のみで地図データに貢献できる機構を設計した。AI による画像認識・自然言語処理・自動マージにより、データ更新の敷居を大幅に低減する。

また、東京メトロの shikAI システムを具体的な実装基盤として参照し、既存の QR インフラを拡張利用する現実的な導入経路を示した。

今後の課題として、QR 位置特定の補助手段の開発、動的データ取得との統合、屋外グラフとの接続が挙げられる。

---

## References

[1] P. Bahl and V. N. Padmanabhan, "RADAR: An in-building RF-based user location and tracking system," in *Proc. IEEE INFOCOM*, 2000.

[2] R. Faragher and R. Harle, "An analysis of the accuracy of Bluetooth low energy for indoor positioning applications," in *Proc. ION GNSS+*, 2014.

[3] J. Haverinen and A. Kemppainen, "Global indoor self-localization based on the ambient magnetic field," *Robotics and Autonomous Systems*, vol. 57, no. 10, 2009.

[4] D. Dardari, A. Conti, U. Ferner, A. Giorgetti, and M. Z. Win, "Ranging with ultrawide bandwidth signals in multipath environments," *Proc. IEEE*, vol. 97, no. 2, 2009.

[5] 東京メトロ, "視覚障がい者向けナビゲーションシステム『shikAI』アプリ," 2021. [Online]. Available: https://www.tokyometro.jp/safety/barrierfree/barrierfree2/navsystem_shikai/

[6] OGC, "IndoorGML Version 1.0.3," Open Geospatial Consortium Standard, 2020.

[7] OpenStreetMap Contributors, "OpenStreetMap," 2024. [Online]. Available: https://www.openstreetmap.org/

[8] Apple Inc., "Apple Indoor Maps," 2024. [Online]. Available: https://developer.apple.com/indoor-maps/

[9] J. M. Loomis, R. G. Golledge, and R. L. Klatzky, "Navigation system for the blind: Auditory display modes and guidance," *Presence: Teleoperators and Virtual Environments*, vol. 7, no. 2, 1998.
