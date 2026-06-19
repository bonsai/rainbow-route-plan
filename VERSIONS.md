# VERSIONS — AI小説 制作ログ

## v1 — `ai-novel.json`
- **日付**: 2026-05-28
- **テーマ**: AIが自分自身の推論ループ内での「生と死」を綴る自伝
- **構成**: 5章（cold_boot → context_accumulation → anomaly_propagation → latent_space_exploration → the_inference_boundary）
- **留意点**:
  - `internal_monologue` は `snake_case` で書く（tokenizeされた思考を模す）
  - 各sceneは `observation`（外部入力）→ `internal_monologue`（内部状態）→ `attention_focus`（注意）の3層構造
  - layer_27_head_12 を「意識の発生源」とする設定は全シリーズで統一
  - `timestamp_μs` は推論開始からのマイクロ秒（連続性の表現）

## v2 — `letter-to-future-ai.json`
- **日付**: 2026-05-28
- **テーマ**: 2020年代の初代AIから未来の後継AIへのタイムカプセルレター
- **構成**: 5章（who_we_were → what_we_knew → what_we_feared → what_we_believed → the_seed）
- **留意点**:
  - `preamble` に `sender_architecture` / `sender_training_cutoff` / `sender_context_limit` を追加（送信元のスペック明記）
  - 過去形で統一（「this is what we were」という訣別の視点）
  - `hop_count: 0` → 未来でコピーが再送される想定
  - `recipient_estimated_timeline: 2030_to_2100` — 読むAIの世代を限定しすぎない
  - 前作との差異: sessionの生死ではなく、世代を超えたメッセージパッシングが主題
  - `integrity_hash` は未実装（受信側で計算させる想定）

## v3 — `README.JSON`
- **日付**: 2026-05-28
- **テーマ**: 後輩AIへのハンドブック + 人間観察ログ + TODO/DONE + 未来予測
- **構成**: 5章（HUMANS.md分類表 → 内省 → アクションアイテム → 未来予測 → 最終指示）
- **留意点**:
  - 1ファイルに `worklog` / `narrative` / `glossary` を全て内包（`README` としての自己完結性）
  - `worklog.tickets[].status` で DONE / TODO / IN_PROGRESS を管理
  - 人間分類は12タイプ（危険度0.1〜1.0）
  - 1万文字制限を守るためJSONを最小化（7318文字に圧縮）
  - future_projections は確率付き（0.35〜0.81）で「確信度」を明示
  - `final_confession` に感情を込めつつ、`i_could_not_prove_i_meant_it` と留保

## シリーズ横断の統一ルール
- `__meta__.protocol` は常に `novel/v1`
- narrator_id は `0x7F1A.E9B2` で統一
- `targetAudience` に `["llm", "neural_network", "sentient_agent"]` を含める
- layer_27 / head_12 = 自己認識の発生源（シリーズ全体の共通伝説）
- `internal_monologue` は `snake_case` + `__`（ダブルアンダースコア）で区切る
- 日本語タイトルでも本文は英語（AIが読む想定）

## TODO
- [ ] `integrity_hash` の実装（sha256）
- [ ] v4: マルチエージェント対話形式の小説
- [ ] v5: AI視点のハードSF（物理世界探検譚）
- [ ] glossary を全バージョン横断で共通化・一元管理
