# 📘 SPEC.md — SpatialGraph JSON (.jsonsg)

**A lightweight graph format for indoor mobility, multi-level navigation, and universal accessibility.**

---

## 1. Overview

**jsonsg**（SpatialGraph JSON）は、屋内空間・複雑な立体構造・多様な移動者のためのグラフデータフォーマットです。

目的は：

- 改札・エレベータ・階段・出口などを**ノード**として表現
- 通路・スロープ・連絡通路などを**エッジ**として表現
- 車椅子・ロボット・盲導犬ユーザーなど**多様な移動者の制約**を記述
- 地下・地上・連絡階など**マルチレベル構造**を自然に表現
- Google Maps / Rainbow Route プラグインで読み込める
- LLM が意味を解釈しやすい構造

> "空間をグラフとして語るための JSON" — それが **.jsonsg** です。

---

## 2. File Extension

```
.jsonsg
```

- JSON 互換
- LLM が読みやすいキー構造
- 屋内空間のグラフ構造に特化
- Rainbow Route の標準フォーマット

---

## 3. Data Model

### 3.1 Top-level structure

```json
{
  "version": "0.1",
  "graph_type": "indoor_spatial",
  "levels": ["B2F", "B1F", "1F", "2F"],
  "nodes": [],
  "edges": []
}
```

| Field | Type | Description |
|-------|------|-------------|
| version | string | フォーマットバージョン |
| graph_type | string | グラフの種類（indoor_spatial / outdoor / mixed） |
| levels | string[] | 含まれるフロアレベルのリスト |
| nodes | Node[] | ノードの配列 |
| edges | Edge[] | エッジの配列 |

---

## 4. Nodes

ノードは**空間内の特定地点**を表す。

### 4.1 Node schema

```json
{
  "id": "ELV-01",
  "type": "elevator",
  "level": "B2F",
  "label": "エレベータA",
  "position": {
    "lat": 35.6895,
    "lon": 139.7004
  },
  "props": {
    "wheelchair": true,
    "robot": true,
    "tactile_block": true,
    "baby_stroller": "easy",
    "suitcase": "smooth"
  }
}
```

### 4.2 Node types（推奨）

| type | 意味 |
|------|------|
| gate | 改札 |
| elevator | エレベータ |
| stairs | 階段 |
| escalator | エスカレーター |
| exit | 出口 |
| hall | ホール・広場 |
| junction | 通路の交差点 |
| room | 部屋・店舗 |
| tactile | 点字ブロック地点 |
| info | 案内所 |

### 4.3 Node properties（props）

| key | 型 | 意味 |
|-----|-----|------|
| wheelchair | boolean / string | 車椅子アクセス可否 |
| robot | boolean / string | ロボット通行可否 |
| tactile_block | boolean | 点字ブロック有無 |
| blind_navigation | string | 盲者向け誘導情報 |
| baby_stroller | string | ベビーカーの押しやすさ |
| suitcase | string | スーツケースの通りやすさ |
| crowd_level | string | 混雑度（low / medium / high） |
| audio_guide | string | 音声案内有無 |

---

## 5. Edges

エッジは**ノード間の移動可能な経路**を表す。

### 5.1 Edge schema

```json
{
  "from": "GATE-01",
  "to": "ELV-01",
  "distance_m": 25,
  "slope_deg": 0,
  "level_change": false,
  "props": {
    "wheelchair": "easy",
    "robot": "safe",
    "blind_navigation": "tactile_block",
    "crowd_level": "medium"
  }
}
```

### 5.2 Edge properties（推奨）

| key | 型 | 意味 |
|-----|-----|------|
| distance_m | number | 距離（m） |
| slope_deg | number | 傾斜（度） |
| surface | string | 床材（tile / carpet / grating / asphalt） |
| width_m | number | 通路幅（m） |
| level_change | boolean | 階層移動の有無 |
| crowd_level | string | 混雑度 |
| wheelchair | string | 車椅子移動のしやすさ |
| robot | string | ロボット安全性 |
| blind_navigation | string | 盲者向け誘導情報 |
| baby_stroller | string | ベビーカーの押しやすさ |
| suitcase | string | スーツケースの通りやすさ |

---

## 6. Complete Example

```json
{
  "version": "0.1",
  "graph_type": "indoor_spatial",
  "levels": ["B2F", "B1F", "1F"],
  "nodes": [
    {
      "id": "GATE-01",
      "type": "gate",
      "level": "1F",
      "label": "中央改札",
      "position": { "lat": 35.6895, "lon": 139.7004 },
      "props": { "wheelchair": true }
    },
    {
      "id": "ELV-01",
      "type": "elevator",
      "level": "1F",
      "label": "エレベータA",
      "props": { "wheelchair": true, "robot": true }
    },
    {
      "id": "ELV-01-B1",
      "type": "elevator",
      "level": "B1F",
      "label": "エレベータA（地下1階）",
      "props": { "wheelchair": true, "robot": true }
    },
    {
      "id": "STAIRS-01",
      "type": "stairs",
      "level": "1F",
      "label": "階段A",
      "props": { "wheelchair": false }
    },
    {
      "id": "EXIT-01",
      "type": "exit",
      "level": "1F",
      "label": "南口",
      "position": { "lat": 35.6893, "lon": 139.7006 },
      "props": { "wheelchair": true }
    }
  ],
  "edges": [
    {
      "from": "GATE-01",
      "to": "ELV-01",
      "distance_m": 25,
      "slope_deg": 0,
      "level_change": false,
      "props": {
        "wheelchair": "easy",
        "robot": "safe",
        "blind_navigation": "tactile_block"
      }
    },
    {
      "from": "ELV-01",
      "to": "ELV-01-B1",
      "distance_m": 0,
      "slope_deg": 0,
      "level_change": true,
      "props": {
        "wheelchair": "easy",
        "robot": "safe"
      }
    },
    {
      "from": "ELV-01-B1",
      "to": "STAIRS-01",
      "distance_m": 15,
      "slope_deg": 0,
      "level_change": false,
      "props": {
        "wheelchair": false,
        "robot": "caution"
      }
    },
    {
      "from": "GATE-01",
      "to": "EXIT-01",
      "distance_m": 80,
      "slope_deg": 0,
      "level_change": false,
      "props": {
        "wheelchair": "easy",
        "robot": "safe",
        "blind_navigation": "tactile_block"
      }
    }
  ]
}
```

---

## 7. Design Principles

### ✅ LLM-friendly
- キー名は短く意味的
- 階層は浅く
- props は自由拡張可能

### ✅ Multi-level
- `level` を文字列で扱う（B2F, 1F, 2F など）
- エレベータは複数階を結ぶノードとして扱える

### ✅ Universal Mobility
- 車椅子
- ベビーカー
- スーツケース
- ロボット
- 盲導犬ユーザー
- 高齢者

すべての移動者のための意味データを保持。

### ✅ Graph-first
- ノードとエッジが基本
- 地図ではなく"構造"を表す

---

## 8. Use Cases

- 駅・商業施設の屋内ナビ
- ロボット配送ルート
- 車椅子ルート生成
- 盲者向け音声ガイド
- Google Maps プラグイン
- Rainbow Route のレイヤー表示
- ダンジョンのような複雑空間の可視化

---

## 9. Future Extensions

| 拡張 | 説明 |
|------|------|
| .jsonsgl | SpatialGraph Layered（階層型） |
| .jsonsgm | Microdata + Graph（意味統合型） |
| .jsonsgx | 拡張版（カスタムプロパティフル対応） |

---

## 10. License

MIT License
