const STATION_SHI_BUYA = {
  "version": "0.1",
  "graph_type": "indoor_spatial",
  "station": "渋谷駅",
  "lines": ["JR山手線","JR埼京線","東京メトロ銀座線","東京メトロ半蔵門線","東京メトロ副都心線","東急東横線","東急田園都市線","京王井の頭線"],
  "levels": ["3F","2F","1F","B1F","B2F","B3F","B4F","B5F"],
  "nodes": [
    {"id":"JR-GATE","type":"gate","level":"2F","label":"JR改札","props":{"wheelchair":true,"robot":true}},
    {"id":"GINZA-GATE","type":"gate","level":"B1F","label":"銀座線改札","props":{"wheelchair":true}},
    {"id":"HANZOMON-GATE","type":"gate","level":"B3F","label":"半蔵門線改札","props":{"wheelchair":true}},
    {"id":"FUKUTOSHIN-GATE","type":"gate","level":"B5F","label":"副都心線改札","props":{"wheelchair":true}},
    {"id":"TOKYU-GATE","type":"gate","level":"2F","label":"東急改札","props":{"wheelchair":true}},
    {"id":"INOKASHIRA-GATE","type":"gate","level":"1F","label":"井の頭線改札","props":{"wheelchair":true}},

    {"id":"EXIT-HACHIKO","type":"exit","level":"2F","label":"ハチ公口","props":{"wheelchair":true,"crowd_level":"high"}},
    {"id":"EXIT-SOUTH","type":"exit","level":"1F","label":"南口","props":{"wheelchair":true}},
    {"id":"EXIT-WEST","type":"exit","level":"B1F","label":"西口地下","props":{"wheelchair":true}},
    {"id":"EXIT-EAST","type":"exit","level":"B1F","label":"東口地下","props":{"wheelchair":true}},

    {"id":"ELV-JR","type":"elevator","level":"2F","label":"JRエレベータ","props":{"wheelchair":true,"robot":true}},
    {"id":"ELV-JR-1F","type":"elevator","level":"1F","label":"JRエレベータ（1F）","props":{"wheelchair":true,"robot":true}},
    {"id":"ELV-JR-B1","type":"elevator","level":"B1F","label":"JRエレベータ（B1）","props":{"wheelchair":true,"robot":true}},
    {"id":"ELV-JR-B3","type":"elevator","level":"B3F","label":"JRエレベータ（B3）","props":{"wheelchair":true,"robot":true}},
    {"id":"ELV-JR-B5","type":"elevator","level":"B5F","label":"JRエレベータ（B5）","props":{"wheelchair":true,"robot":true}},
    {"id":"ELV-HACHIKO","type":"elevator","level":"2F","label":"ハチ公前エレベータ","props":{"wheelchair":true}},

    {"id":"STAIRS-HACHIKO","type":"stairs","level":"2F","label":"ハチ公階段","props":{"wheelchair":false}},
    {"id":"STAIRS-SOUTH","type":"stairs","level":"1F","label":"南口階段","props":{"wheelchair":false}},

    {"id":"SLOPE-HACHIKO","type":"escalator","level":"2F","label":"ハチ公前スロープ","props":{"wheelchair":"easy","baby_stroller":"easy"}},
    {"id":"SLOPE-HACHIKO-1F","type":"escalator","level":"1F","label":"ハチ公前スロープ（1F）","props":{"wheelchair":"easy"}},

    {"id":"PLAT-JR","type":"junction","level":"2F","label":"JRホーム","props":{"wheelchair":true}},
    {"id":"PLAT-GINZA","type":"junction","level":"B1F","label":"銀座線ホーム","props":{"wheelchair":true}},
    {"id":"PLAT-HANZOMON","type":"junction","level":"B3F","label":"半蔵門線ホーム","props":{"wheelchair":true}},
    {"id":"PLAT-FUKUTOSHIN","type":"junction","level":"B5F","label":"副都心線ホーム","props":{"wheelchair":true}},
    {"id":"PLAT-TOKYU","type":"junction","level":"2F","label":"東急ホーム","props":{"wheelchair":true}},

    {"id":"TACTILE-JR","type":"tactile","level":"2F","label":"JR改札前点字ブロック","props":{"blind_navigation":"tactile_block"}},
    {"id":"TACTILE-HACHIKO","type":"tactile","level":"2F","label":"ハチ公前点字ブロック","props":{"blind_navigation":"tactile_block"}},

    {"id":"CONCOURSE-JR","type":"hall","level":"2F","label":"JRコンコース","props":{"wheelchair":true,"width_m":5.0}},
    {"id":"CONCOURSE-UNDER","type":"hall","level":"B1F","label":"地下コンコース","props":{"wheelchair":true,"width_m":4.0}}
  ],
  "edges": [
    {"from":"JR-GATE","to":"CONCOURSE-JR","distance_m":3,"props":{"wheelchair":"easy","blind_navigation":"tactile_block"}},
    {"from":"CONCOURSE-JR","to":"EXIT-HACHIKO","distance_m":15,"props":{"wheelchair":"easy","crowd_level":"high"}},
    {"from":"CONCOURSE-JR","to":"TACTILE-JR","distance_m":5,"props":{"blind_navigation":"tactile_block"}},
    {"from":"CONCOURSE-JR","to":"TACTILE-HACHIKO","distance_m":12,"props":{"blind_navigation":"tactile_block"}},

    {"from":"CONCOURSE-JR","to":"ELV-JR","distance_m":10,"props":{"wheelchair":"easy","robot":"safe"}},
    {"from":"ELV-JR","to":"ELV-JR-1F","distance_m":0,"level_change":true,"props":{"wheelchair":"easy","robot":"safe"}},
    {"from":"ELV-JR-1F","to":"ELV-JR-B1","distance_m":0,"level_change":true,"props":{"wheelchair":"easy","robot":"safe"}},
    {"from":"ELV-JR-B1","to":"ELV-JR-B3","distance_m":0,"level_change":true,"props":{"wheelchair":"easy","robot":"safe"}},
    {"from":"ELV-JR-B3","to":"ELV-JR-B5","distance_m":0,"level_change":true,"props":{"wheelchair":"easy","robot":"safe"}},

    {"from":"CONCOURSE-JR","to":"STAIRS-HACHIKO","distance_m":20,"props":{"wheelchair":false}},
    {"from":"CONCOURSE-JR","to":"SLOPE-HACHIKO","distance_m":18,"props":{"wheelchair":"easy","baby_stroller":"easy"}},
    {"from":"SLOPE-HACHIKO","to":"SLOPE-HACHIKO-1F","distance_m":0,"slope_deg":8,"level_change":true,"props":{"wheelchair":"easy"}},
    {"from":"SLOPE-HACHIKO-1F","to":"EXIT-SOUTH","distance_m":10,"props":{"wheelchair":"easy"}},

    {"from":"CONCOURSE-JR","to":"PLAT-JR","distance_m":25,"props":{"wheelchair":"easy"}},
    {"from":"CONCOURSE-JR","to":"TOKYU-GATE","distance_m":20,"props":{"wheelchair":"easy"}},
    {"from":"TOKYU-GATE","to":"PLAT-TOKYU","distance_m":10,"props":{"wheelchair":"easy"}},

    {"from":"ELV-JR-B1","to":"CONCOURSE-UNDER","distance_m":5,"props":{"wheelchair":"easy","robot":"safe"}},
    {"from":"CONCOURSE-UNDER","to":"GINZA-GATE","distance_m":15,"props":{"wheelchair":"easy"}},
    {"from":"GINZA-GATE","to":"PLAT-GINZA","distance_m":10,"props":{"wheelchair":"easy"}},
    {"from":"CONCOURSE-UNDER","to":"EXIT-WEST","distance_m":12,"props":{"wheelchair":"easy"}},
    {"from":"CONCOURSE-UNDER","to":"EXIT-EAST","distance_m":15,"props":{"wheelchair":"easy"}},
    {"from":"CONCOURSE-UNDER","to":"INOKASHIRA-GATE","distance_m":25,"props":{"wheelchair":"easy"}},
    {"from":"INOKASHIRA-GATE","to":"PLAT-FUKUTOSHIN","distance_m":0,"level_change":true,"props":{"wheelchair":false}},

    {"from":"ELV-JR-B3","to":"HANZOMON-GATE","distance_m":5,"props":{"wheelchair":"easy","robot":"safe"}},
    {"from":"HANZOMON-GATE","to":"PLAT-HANZOMON","distance_m":10,"props":{"wheelchair":"easy"}},

    {"from":"ELV-JR-B5","to":"FUKUTOSHIN-GATE","distance_m":5,"props":{"wheelchair":"easy","robot":"safe"}},
    {"from":"FUKUTOSHIN-GATE","to":"PLAT-FUKUTOSHIN","distance_m":10,"props":{"wheelchair":"easy"}},

    {"from":"CONCOURSE-JR","to":"ELV-HACHIKO","distance_m":5,"props":{"wheelchair":"easy"}},
    {"from":"EXIT-HACHIKO","to":"SLOPE-HACHIKO","distance_m":3,"props":{"wheelchair":"easy"}}
  ]
}
