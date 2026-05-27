# Building QR-Based Indoor Position API Server

**建物内位置データを QR で提供する API サーバ ソリューション**

---

## 🎯 概要

本ソリューションは、建物内の位置情報を QR コードを入口・通路・階段・エレベーター等に設置し、スマホで読み取るだけで API から正確な位置データを取得できる仕組みを提供する。

GPS が届かない屋内でも、ロボット・車椅子・ベビーカー・盲導犬ユーザー・高齢者など多様な移動者が迷わず移動できるための基盤となる。

---

## 🏗 システム構成

### 1. QR コード（位置ID）

- 各地点に固有の `location_id` を付与
- 印刷して貼るだけで運用可能
- オフラインでも読み取れる

### 2. 位置データ API サーバ

QR を読み取ると以下のような API を叩く：

```
GET /api/location/{location_id}
```

**レスポンス例：**

```json
{
  "location_id": "B2F-ELV-03",
  "name": "地下2階 エレベーター前",
  "level": -2,
  "coordinates": [35.6895, 139.7004],
  "features": {
    "wheelchair": true,
    "tactile_block": true,
    "robot_passable": true
  }
}
```

### 3. Google Maps / Rainbow Route プラグイン

- API から取得した位置を Google Maps 上に重ねて表示
- Rainbow Route のユニバーサル移動データと統合
- マルチレベル（地下・地上）対応

---

## 🧭 ユースケース

- 商業施設・駅・病院などの屋内ナビゲーション
- ロボット配送の位置補正
- 車椅子ユーザーの経路案内
- 盲者向け音声ガイドの位置同期
- ベビーカー・スーツケース向けルート案内

---

## 🛠 技術スタック（例）

| 要素 | 候補 |
|------|------|
| API | Node.js / FastAPI / Go |
| DB | PostgreSQL / SQLite / Supabase |
| QR | 静的 PNG / SVG |
| 認証 | API Key / JWT |
| デプロイ | Cloud Run / Vercel / AWS Lambda |

---

## 🔐 セキュリティ

- QR コードは位置IDのみ（個人情報なし）
- HTTPS 必須
- API Key によるアクセス制御
- 施設ごとの権限管理

---

## 🚀 メリット

- 設置コストが極めて低い
- GPS 不要で高精度
- ロボット・人間・盲導犬ユーザーすべてに対応
- Google Maps と統合可能
- Rainbow Route の基盤として利用可能
