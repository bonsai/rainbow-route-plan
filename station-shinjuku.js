const STATION_SHINJUKU = {
  "version": "0.1",
  "graph_type": "indoor_spatial",
  "station": "新宿駅",
  "lines": ["JR山手線","JR中央線","JR総武線","JR埼京線","京王線","小田急線","東京メトロ丸ノ内線","都営新宿線"],
  "levels": ["3F","2F","1F","B1F","B2F","B3F","B4F","B5F"],
  "nodes": [
    {"id":"JR-GATE-E","type":"gate","level":"1F","label":"JR東口改札","props":{"wheelchair":true,"robot":true}},
    {"id":"JR-GATE-W","type":"gate","level":"1F","label":"JR西口改札","props":{"wheelchair":true,"robot":true}},
    {"id":"JR-GATE-S","type":"gate","level":"1F","label":"JR南口改札","props":{"wheelchair":true,"robot":true}},
    {"id":"JR-GATE-N","type":"gate","level":"1F","label":"JR北口改札","props":{"wheelchair":true}},
    {"id":"JR-GATE-C","type":"gate","level":"B1F","label":"JR中央東口改札","props":{"wheelchair":true,"robot":true}},
    {"id":"KEIO-GATE","type":"gate","level":"3F","label":"京王口改札","props":{"wheelchair":true}},
    {"id":"ODAKYU-GATE","type":"gate","level":"3F","label":"小田急口改札","props":{"wheelchair":true}},
    {"id":"METRO-GATE","type":"gate","level":"B2F","label":"丸ノ内線改札","props":{"wheelchair":true}},
    {"id":"TOEI-GATE","type":"gate","level":"B3F","label":"都営新宿線改札","props":{"wheelchair":true}},

    {"id":"EXIT-EAST","type":"exit","level":"1F","label":"東口","props":{"wheelchair":true}},
    {"id":"EXIT-WEST","type":"exit","level":"1F","label":"西口","props":{"wheelchair":true}},
    {"id":"EXIT-SOUTH","type":"exit","level":"1F","label":"南口","props":{"wheelchair":true}},
    {"id":"EXIT-NORTH","type":"exit","level":"1F","label":"北口","props":{"wheelchair":true}},
    {"id":"EXIT-CENTRAL-E","type":"exit","level":"B1F","label":"中央東口","props":{"wheelchair":true}},
    {"id":"EXIT-CENTRAL-W","type":"exit","level":"B1F","label":"中央西口","props":{"wheelchair":true}},

    {"id":"ELV-JR-E","type":"elevator","level":"1F","label":"JR東口エレベータ","props":{"wheelchair":true,"robot":true}},
    {"id":"ELV-JR-E-B1","type":"elevator","level":"B1F","label":"JR東口エレベータ（B1）","props":{"wheelchair":true,"robot":true}},
    {"id":"ELV-JR-E-B2","type":"elevator","level":"B2F","label":"JR東口エレベータ（B2）","props":{"wheelchair":true,"robot":true}},
    {"id":"ELV-JR-E-B3","type":"elevator","level":"B3F","label":"JR東口エレベータ（B3）","props":{"wheelchair":true,"robot":true}},
    {"id":"ELV-JR-W","type":"elevator","level":"1F","label":"JR西口エレベータ","props":{"wheelchair":true,"robot":true}},
    {"id":"ELV-JR-W-B1","type":"elevator","level":"B1F","label":"JR西口エレベータ（B1）","props":{"wheelchair":true,"robot":true}},
    {"id":"ELV-JR-W-B2","type":"elevator","level":"B2F","label":"JR西口エレベータ（B2）","props":{"wheelchair":true,"robot":true}},
    {"id":"ELV-KEIO","type":"elevator","level":"3F","label":"京王エレベータ","props":{"wheelchair":true}},
    {"id":"ELV-KEIO-2F","type":"elevator","level":"2F","label":"京王エレベータ（2F）","props":{"wheelchair":true}},
    {"id":"ELV-KEIO-1F","type":"elevator","level":"1F","label":"京王エレベータ（1F）","props":{"wheelchair":true}},
    {"id":"ELV-ODAKYU","type":"elevator","level":"3F","label":"小田急エレベータ","props":{"wheelchair":true}},
    {"id":"ELV-ODAKYU-1F","type":"elevator","level":"1F","label":"小田急エレベータ（1F）","props":{"wheelchair":true}},

    {"id":"STAIRS-JR-E","type":"stairs","level":"1F","label":"JR東口階段","props":{"wheelchair":false}},
    {"id":"STAIRS-JR-W","type":"stairs","level":"1F","label":"JR西口階段","props":{"wheelchair":false}},
    {"id":"STAIRS-CENTRAL","type":"stairs","level":"B1F","label":"中央通路階段","props":{"wheelchair":false}},

    {"id":"SLOPE-JR-E","type":"escalator","level":"1F","label":"JR東口スロープ","props":{"wheelchair":true,"baby_stroller":"easy"}},
    {"id":"SLOPE-JR-E-B1","type":"escalator","level":"B1F","label":"JR東口スロープ（B1）","props":{"wheelchair":true,"baby_stroller":"easy"}},

    {"id":"PLAT-JR-YAMANOTE","type":"junction","level":"2F","label":"山手線ホーム","props":{"wheelchair":true}},
    {"id":"PLAT-JR-CHUO","type":"junction","level":"2F","label":"中央線ホーム","props":{"wheelchair":true}},
    {"id":"PLAT-JR-SHONAN","type":"junction","level":"B1F","label":"埼京線・湘南新宿ホーム","props":{"wheelchair":true}},
    {"id":"PLAT-KEIO","type":"junction","level":"3F","label":"京王線ホーム","props":{"wheelchair":true}},
    {"id":"PLAT-ODAKYU","type":"junction","level":"3F","label":"小田急線ホーム","props":{"wheelchair":true}},
    {"id":"PLAT-METRO","type":"junction","level":"B2F","label":"丸ノ内線ホーム","props":{"wheelchair":true}},
    {"id":"PLAT-TOEI","type":"junction","level":"B3F","label":"都営新宿線ホーム","props":{"wheelchair":true}},

    {"id":"TACTILE-JR-E","type":"tactile","level":"1F","label":"東口点字ブロック","props":{"blind_navigation":"tactile_block"}},
    {"id":"TACTILE-JR-W","type":"tactile","level":"1F","label":"西口点字ブロック","props":{"blind_navigation":"tactile_block"}},
    {"id":"TACTILE-CENTRAL","type":"tactile","level":"B1F","label":"中央通路点字ブロック","props":{"blind_navigation":"tactile_block"}},

    {"id":"INFO-JR-E","type":"info","level":"1F","label":"JR東口案内所","props":{"wheelchair":true}},
    {"id":"INFO-JR-W","type":"info","level":"1F","label":"JR西口案内所","props":{"wheelchair":true}},
    {"id":"TOILET-WC-E","type":"room","level":"1F","label":"多機能トイレ（東）","props":{"wheelchair":true}},
    {"id":"TOILET-WC-W","type":"room","level":"1F","label":"多機能トイレ（西）","props":{"wheelchair":true}},

    {"id":"CONCOURSE-E","type":"hall","level":"1F","label":"東コンコース","props":{"wheelchair":true}},
    {"id":"CONCOURSE-W","type":"hall","level":"1F","label":"西コンコース","props":{"wheelchair":true}},
    {"id":"CONCOURSE-CENTRAL","type":"hall","level":"B1F","label":"中央通路","props":{"wheelchair":true,"width_m":6.0}},
    {"id":"CONCOURSE-KEIO","type":"hall","level":"3F","label":"京王コンコース","props":{"wheelchair":true}}
  ],
  "edges": [
    {"from":"JR-GATE-E","to":"CONCOURSE-E","distance_m":5,"slope_deg":0,"props":{"wheelchair":"easy","blind_navigation":"tactile_block"}},
    {"from":"JR-GATE-W","to":"CONCOURSE-W","distance_m":5,"slope_deg":0,"props":{"wheelchair":"easy","blind_navigation":"tactile_block"}},
    {"from":"JR-GATE-S","to":"CONCOURSE-E","distance_m":30,"slope_deg":0,"props":{"wheelchair":"easy","width_m":3.0}},
    {"from":"JR-GATE-N","to":"CONCOURSE-W","distance_m":25,"slope_deg":0,"props":{"wheelchair":"easy"}},
    {"from":"JR-GATE-C","to":"CONCOURSE-CENTRAL","distance_m":5,"slope_deg":0,"props":{"wheelchair":"easy","robot":"safe"}},

    {"from":"CONCOURSE-E","to":"EXIT-EAST","distance_m":10,"slope_deg":0,"props":{"wheelchair":"easy"}},
    {"from":"CONCOURSE-W","to":"EXIT-WEST","distance_m":10,"slope_deg":0,"props":{"wheelchair":"easy"}},
    {"from":"CONCOURSE-E","to":"EXIT-SOUTH","distance_m":50,"slope_deg":0,"props":{"wheelchair":"easy","width_m":3.0}},
    {"from":"CONCOURSE-W","to":"EXIT-NORTH","distance_m":20,"slope_deg":0,"props":{"wheelchair":"easy"}},

    {"from":"CONCOURSE-E","to":"ELV-JR-E","distance_m":15,"slope_deg":0,"props":{"wheelchair":"easy","robot":"safe","blind_navigation":"tactile_block"}},
    {"from":"ELV-JR-E","to":"ELV-JR-E-B1","distance_m":0,"slope_deg":0,"level_change":true,"props":{"wheelchair":"easy","robot":"safe"}},
    {"from":"ELV-JR-E-B1","to":"ELV-JR-E-B2","distance_m":0,"slope_deg":0,"level_change":true,"props":{"wheelchair":"easy","robot":"safe"}},
    {"from":"ELV-JR-E-B2","to":"ELV-JR-E-B3","distance_m":0,"slope_deg":0,"level_change":true,"props":{"wheelchair":"easy","robot":"safe"}},
    {"from":"ELV-JR-E-B3","to":"PLAT-TOEI","distance_m":15,"slope_deg":0,"props":{"wheelchair":"easy","robot":"safe","surface":"tile","width_m":2.0}},

    {"from":"CONCOURSE-W","to":"ELV-JR-W","distance_m":15,"slope_deg":0,"props":{"wheelchair":"easy","robot":"safe","blind_navigation":"tactile_block"}},
    {"from":"ELV-JR-W","to":"ELV-JR-W-B1","distance_m":0,"slope_deg":0,"level_change":true,"props":{"wheelchair":"easy","robot":"safe"}},
    {"from":"ELV-JR-W-B1","to":"ELV-JR-W-B2","distance_m":0,"slope_deg":0,"level_change":true,"props":{"wheelchair":"easy","robot":"safe"}},

    {"from":"CONCOURSE-E","to":"STAIRS-JR-E","distance_m":20,"slope_deg":0,"props":{"wheelchair":false}},
    {"from":"STAIRS-JR-E","to":"PLAT-JR-YAMANOTE","distance_m":0,"slope_deg":25,"level_change":true,"props":{"wheelchair":false}},

    {"from":"CONCOURSE-E","to":"SLOPE-JR-E","distance_m":18,"slope_deg":0,"props":{"wheelchair":"easy","baby_stroller":"easy"}},
    {"from":"SLOPE-JR-E","to":"SLOPE-JR-E-B1","distance_m":0,"slope_deg":8,"level_change":true,"props":{"wheelchair":"easy","baby_stroller":"easy"}},
    {"from":"SLOPE-JR-E-B1","to":"CONCOURSE-CENTRAL","distance_m":10,"slope_deg":0,"props":{"wheelchair":"easy","baby_stroller":"easy"}},

    {"from":"CONCOURSE-E","to":"TACTILE-JR-E","distance_m":8,"slope_deg":0,"props":{"blind_navigation":"tactile_block"}},
    {"from":"CONCOURSE-W","to":"TACTILE-JR-W","distance_m":8,"slope_deg":0,"props":{"blind_navigation":"tactile_block"}},
    {"from":"CONCOURSE-CENTRAL","to":"TACTILE-CENTRAL","distance_m":5,"slope_deg":0,"props":{"blind_navigation":"tactile_block","wheelchair":"easy"}},

    {"from":"CONCOURSE-E","to":"INFO-JR-E","distance_m":3,"slope_deg":0,"props":{"wheelchair":"easy"}},
    {"from":"CONCOURSE-W","to":"INFO-JR-W","distance_m":3,"slope_deg":0,"props":{"wheelchair":"easy"}},
    {"from":"CONCOURSE-E","to":"TOILET-WC-E","distance_m":12,"slope_deg":0,"props":{"wheelchair":"easy","width_m":1.5}},
    {"from":"CONCOURSE-W","to":"TOILET-WC-W","distance_m":12,"slope_deg":0,"props":{"wheelchair":"easy","width_m":1.5}},

    {"from":"CONCOURSE-CENTRAL","to":"EXIT-CENTRAL-E","distance_m":20,"slope_deg":0,"props":{"wheelchair":"easy","robot":"safe"}},
    {"from":"CONCOURSE-CENTRAL","to":"EXIT-CENTRAL-W","distance_m":15,"slope_deg":0,"props":{"wheelchair":"easy","robot":"safe"}},
    {"from":"CONCOURSE-CENTRAL","to":"STAIRS-CENTRAL","distance_m":30,"slope_deg":0,"props":{"wheelchair":false}},
    {"from":"CONCOURSE-CENTRAL","to":"ELV-JR-E-B1","distance_m":15,"slope_deg":0,"props":{"wheelchair":"easy","robot":"safe"}},
    {"from":"CONCOURSE-CENTRAL","to":"ELV-JR-W-B1","distance_m":40,"slope_deg":0,"props":{"wheelchair":"easy","robot":"safe"}},
    {"from":"ELV-JR-W-B1","to":"JR-GATE-C","distance_m":10,"slope_deg":0,"props":{"wheelchair":"easy","robot":"safe"}},
    {"from":"CONCOURSE-CENTRAL","to":"PLAT-JR-SHONAN","distance_m":25,"slope_deg":0,"props":{"wheelchair":"easy","robot":"safe","surface":"tile"}},

    {"from":"ELV-JR-E-B2","to":"METRO-GATE","distance_m":5,"slope_deg":0,"props":{"wheelchair":"easy","robot":"safe","width_m":2.0}},
    {"from":"METRO-GATE","to":"PLAT-METRO","distance_m":20,"slope_deg":0,"props":{"wheelchair":"easy","robot":"safe"}},

    {"from":"CONCOURSE-KEIO","to":"KEIO-GATE","distance_m":5,"slope_deg":0,"props":{"wheelchair":"easy"}},
    {"from":"CONCOURSE-KEIO","to":"PLAT-KEIO","distance_m":15,"slope_deg":0,"props":{"wheelchair":"easy"}},
    {"from":"CONCOURSE-KEIO","to":"ELV-KEIO","distance_m":10,"slope_deg":0,"props":{"wheelchair":"easy"}},
    {"from":"ELV-KEIO","to":"ELV-KEIO-2F","distance_m":0,"slope_deg":0,"level_change":true,"props":{"wheelchair":"easy"}},
    {"from":"ELV-KEIO-2F","to":"ELV-KEIO-1F","distance_m":0,"slope_deg":0,"level_change":true,"props":{"wheelchair":"easy"}},
    {"from":"ELV-KEIO-1F","to":"CONCOURSE-E","distance_m":20,"slope_deg":0,"props":{"wheelchair":"easy"}},

    {"from":"CONCOURSE-KEIO","to":"ODAKYU-GATE","distance_m":30,"slope_deg":0,"props":{"wheelchair":"easy"}},
    {"from":"ODAKYU-GATE","to":"PLAT-ODAKYU","distance_m":10,"slope_deg":0,"props":{"wheelchair":"easy"}},
    {"from":"ODAKYU-GATE","to":"ELV-ODAKYU","distance_m":5,"slope_deg":0,"props":{"wheelchair":"easy"}},
    {"from":"ELV-ODAKYU","to":"ELV-ODAKYU-1F","distance_m":0,"slope_deg":0,"level_change":true,"props":{"wheelchair":"easy"}},
    {"from":"ELV-ODAKYU-1F","to":"CONCOURSE-W","distance_m":15,"slope_deg":0,"props":{"wheelchair":"easy"}},

    {"from":"PLAT-JR-YAMANOTE","to":"PLAT-JR-CHUO","distance_m":30,"slope_deg":0,"props":{"wheelchair":"easy","width_m":3.0}}
  ]
}
