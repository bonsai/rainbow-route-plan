const STATION_OSAKI = {
  "version": "0.1",
  "graph_type": "indoor_spatial",
  "station": "大崎駅",
  "lines": ["JR山手線","JR埼京線","JR湘南新宿ライン","東京りんかい線"],
  "levels": ["2F","1F"],
  "nodes": [
    {"id":"GATE-NORTH","type":"gate","level":"2F","label":"北改札","props":{"wheelchair":true,"robot":true}},
    {"id":"GATE-SOUTH","type":"gate","level":"2F","label":"南改札","props":{"wheelchair":true,"robot":true}},

    {"id":"EXIT-EAST","type":"exit","level":"2F","label":"東口","props":{"wheelchair":true}},
    {"id":"EXIT-WEST","type":"exit","level":"2F","label":"西口","props":{"wheelchair":true}},
    {"id":"EXIT-NEW-EAST","type":"exit","level":"2F","label":"新東口","props":{"wheelchair":true}},
    {"id":"EXIT-NEW-WEST","type":"exit","level":"2F","label":"新西口","props":{"wheelchair":true}},

    {"id":"ELV-NORTH-EAST-2F","type":"elevator","level":"2F","label":"北改札東口エレベータ（2F）","props":{"wheelchair":true,"robot":true}},
    {"id":"ELV-NORTH-EAST-1F","type":"elevator","level":"1F","label":"北改札東口エレベータ（1F）","props":{"wheelchair":true,"robot":true}},
    {"id":"ELV-NORTH-WEST-2F","type":"elevator","level":"2F","label":"北改札西口エレベータ（2F）","props":{"wheelchair":true,"robot":true}},
    {"id":"ELV-NORTH-WEST-1F","type":"elevator","level":"1F","label":"北改札西口エレベータ（1F）","props":{"wheelchair":true,"robot":true}},
    {"id":"ELV-SOUTH-EAST-2F","type":"elevator","level":"2F","label":"南改札新東口エレベータ（2F）","props":{"wheelchair":true,"robot":true}},
    {"id":"ELV-SOUTH-EAST-1F","type":"elevator","level":"1F","label":"南改札新東口エレベータ（1F）","props":{"wheelchair":true,"robot":true}},
    {"id":"ELV-SOUTH-WEST-2F","type":"elevator","level":"2F","label":"南改札新西口エレベータ（2F）","props":{"wheelchair":true,"robot":true}},
    {"id":"ELV-SOUTH-WEST-1F","type":"elevator","level":"1F","label":"南改札新西口エレベータ（1F）","props":{"wheelchair":true,"robot":true}},

    {"id":"ELV-PLAT-A","type":"elevator","level":"1F","label":"ホームAエレベータ","props":{"wheelchair":true,"robot":true}},
    {"id":"ELV-PLAT-A-2F","type":"elevator","level":"2F","label":"ホームAエレベータ（2F）","props":{"wheelchair":true,"robot":true}},
    {"id":"ELV-PLAT-B","type":"elevator","level":"1F","label":"ホームBエレベータ","props":{"wheelchair":true,"robot":true}},
    {"id":"ELV-PLAT-B-2F","type":"elevator","level":"2F","label":"ホームBエレベータ（2F）","props":{"wheelchair":true,"robot":true}},

    {"id":"STAIRS-NORTH","type":"stairs","level":"2F","label":"北改札階段","props":{"wheelchair":false}},
    {"id":"STAIRS-SOUTH","type":"stairs","level":"2F","label":"南改札階段","props":{"wheelchair":false}},

    {"id":"SLOPE-SOUTH","type":"escalator","level":"2F","label":"南改札スロープ","props":{"wheelchair":"easy","baby_stroller":"easy"}},
    {"id":"SLOPE-SOUTH-1F","type":"escalator","level":"1F","label":"南改札スロープ（1F）","props":{"wheelchair":"easy","baby_stroller":"easy"}},

    {"id":"PLAT-YAMANOTE-IN","type":"junction","level":"1F","label":"山手線内回りホーム（1・2番線）","props":{"wheelchair":true}},
    {"id":"PLAT-YAMANOTE-OUT","type":"junction","level":"1F","label":"山手線外回りホーム（3・4番線）","props":{"wheelchair":true}},
    {"id":"PLAT-SAIKYO","type":"junction","level":"1F","label":"埼京線・湘南新宿・りんかい線ホーム（5〜8番線）","props":{"wheelchair":true}},

    {"id":"TACTILE-NORTH","type":"tactile","level":"2F","label":"北改札前点字ブロック","props":{"blind_navigation":"tactile_block"}},
    {"id":"TACTILE-SOUTH","type":"tactile","level":"2F","label":"南改札前点字ブロック","props":{"blind_navigation":"tactile_block"}},

    {"id":"INFO-NORTH","type":"info","level":"2F","label":"北改札案内所","props":{"wheelchair":true}},
    {"id":"INFO-SOUTH","type":"info","level":"2F","label":"南改札案内所","props":{"wheelchair":true}},

    {"id":"TOILET-WC-NORTH","type":"room","level":"2F","label":"多機能トイレ（北）","props":{"wheelchair":true}},
    {"id":"TOILET-WC-SOUTH","type":"room","level":"2F","label":"多機能トイレ（南）","props":{"wheelchair":true}},

    {"id":"CONCOURSE-NORTH","type":"hall","level":"2F","label":"北コンコース","props":{"wheelchair":true,"width_m":5.0}},
    {"id":"CONCOURSE-SOUTH","type":"hall","level":"2F","label":"南コンコース","props":{"wheelchair":true,"width_m":4.0}},
    {"id":"PASSAGE-CENTER","type":"hall","level":"2F","label":"南北連絡通路","props":{"wheelchair":true,"width_m":3.0}},

    {"id":"GATE-CITY","type":"hall","level":"1F","label":"ゲートシティ大崎連絡口","props":{"wheelchair":true}},
    {"id":"THINK-PARK","type":"hall","level":"1F","label":"ThinkPark連絡口","props":{"wheelchair":true}},
    {"id":"DILA","type":"room","level":"2F","label":"Dila大崎","props":{"wheelchair":true}}
  ],
  "edges": [
    {"from":"GATE-NORTH","to":"CONCOURSE-NORTH","distance_m":3,"props":{"wheelchair":"easy","blind_navigation":"tactile_block"}},
    {"from":"GATE-SOUTH","to":"CONCOURSE-SOUTH","distance_m":3,"props":{"wheelchair":"easy","blind_navigation":"tactile_block"}},
    {"from":"CONCOURSE-NORTH","to":"PASSAGE-CENTER","distance_m":30,"props":{"wheelchair":"easy","width_m":3.0}},
    {"from":"CONCOURSE-SOUTH","to":"PASSAGE-CENTER","distance_m":25,"props":{"wheelchair":"easy","width_m":3.0}},

    {"from":"CONCOURSE-NORTH","to":"EXIT-EAST","distance_m":10,"props":{"wheelchair":"easy"}},
    {"from":"CONCOURSE-NORTH","to":"EXIT-WEST","distance_m":10,"props":{"wheelchair":"easy"}},
    {"from":"CONCOURSE-SOUTH","to":"EXIT-NEW-EAST","distance_m":8,"props":{"wheelchair":"easy"}},
    {"from":"CONCOURSE-SOUTH","to":"EXIT-NEW-WEST","distance_m":8,"props":{"wheelchair":"easy"}},

    {"from":"CONCOURSE-NORTH","to":"TACTILE-NORTH","distance_m":5,"props":{"blind_navigation":"tactile_block"}},
    {"from":"CONCOURSE-SOUTH","to":"TACTILE-SOUTH","distance_m":5,"props":{"blind_navigation":"tactile_block"}},

    {"from":"CONCOURSE-NORTH","to":"INFO-NORTH","distance_m":3,"props":{"wheelchair":"easy"}},
    {"from":"CONCOURSE-SOUTH","to":"INFO-SOUTH","distance_m":3,"props":{"wheelchair":"easy"}},
    {"from":"CONCOURSE-NORTH","to":"TOILET-WC-NORTH","distance_m":15,"props":{"wheelchair":"easy","width_m":1.5}},
    {"from":"CONCOURSE-SOUTH","to":"TOILET-WC-SOUTH","distance_m":15,"props":{"wheelchair":"easy","width_m":1.5}},
    {"from":"CONCOURSE-NORTH","to":"DILA","distance_m":12,"props":{"wheelchair":"easy"}},

    {"from":"CONCOURSE-NORTH","to":"ELV-NORTH-EAST-2F","distance_m":8,"props":{"wheelchair":"easy","robot":"safe"}},
    {"from":"ELV-NORTH-EAST-2F","to":"ELV-NORTH-EAST-1F","distance_m":0,"level_change":true,"props":{"wheelchair":"easy","robot":"safe"}},
    {"from":"CONCOURSE-NORTH","to":"ELV-NORTH-WEST-2F","distance_m":8,"props":{"wheelchair":"easy","robot":"safe"}},
    {"from":"ELV-NORTH-WEST-2F","to":"ELV-NORTH-WEST-1F","distance_m":0,"level_change":true,"props":{"wheelchair":"easy","robot":"safe"}},

    {"from":"CONCOURSE-SOUTH","to":"SLOPE-SOUTH","distance_m":5,"props":{"wheelchair":"easy","baby_stroller":"easy"}},
    {"from":"SLOPE-SOUTH","to":"SLOPE-SOUTH-1F","distance_m":0,"slope_deg":6,"level_change":true,"props":{"wheelchair":"easy","baby_stroller":"easy"}},
    {"from":"SLOPE-SOUTH-1F","to":"GATE-CITY","distance_m":15,"props":{"wheelchair":"easy"}},

    {"from":"CONCOURSE-SOUTH","to":"ELV-SOUTH-EAST-2F","distance_m":10,"props":{"wheelchair":"easy","robot":"safe"}},
    {"from":"ELV-SOUTH-EAST-2F","to":"ELV-SOUTH-EAST-1F","distance_m":0,"level_change":true,"props":{"wheelchair":"easy","robot":"safe"}},
    {"from":"CONCOURSE-SOUTH","to":"ELV-SOUTH-WEST-2F","distance_m":12,"props":{"wheelchair":"easy","robot":"safe"}},
    {"from":"ELV-SOUTH-WEST-2F","to":"ELV-SOUTH-WEST-1F","distance_m":0,"level_change":true,"props":{"wheelchair":"easy","robot":"safe"}},
    {"from":"ELV-SOUTH-WEST-1F","to":"THINK-PARK","distance_m":10,"props":{"wheelchair":"easy"}},

    {"from":"CONCOURSE-NORTH","to":"STAIRS-NORTH","distance_m":12,"props":{"wheelchair":false}},
    {"from":"CONCOURSE-SOUTH","to":"STAIRS-SOUTH","distance_m":10,"props":{"wheelchair":false}},

    {"from":"CONCOURSE-NORTH","to":"ELV-PLAT-A-2F","distance_m":15,"props":{"wheelchair":"easy","robot":"safe"}},
    {"from":"ELV-PLAT-A-2F","to":"ELV-PLAT-A","distance_m":0,"level_change":true,"props":{"wheelchair":"easy","robot":"safe"}},
    {"from":"ELV-PLAT-A","to":"PLAT-YAMANOTE-IN","distance_m":10,"props":{"wheelchair":"easy","robot":"safe"}},
    {"from":"ELV-PLAT-A","to":"PLAT-YAMANOTE-OUT","distance_m":15,"props":{"wheelchair":"easy","robot":"safe"}},

    {"from":"CONCOURSE-NORTH","to":"ELV-PLAT-B-2F","distance_m":25,"props":{"wheelchair":"easy","robot":"safe"}},
    {"from":"ELV-PLAT-B-2F","to":"ELV-PLAT-B","distance_m":0,"level_change":true,"props":{"wheelchair":"easy","robot":"safe"}},
    {"from":"ELV-PLAT-B","to":"PLAT-SAIKYO","distance_m":10,"props":{"wheelchair":"easy","robot":"safe"}},
    {"from":"ELV-PLAT-B","to":"PLAT-YAMANOTE-OUT","distance_m":20,"props":{"wheelchair":"easy","robot":"safe"}},

    {"from":"PLAT-YAMANOTE-IN","to":"PLAT-YAMANOTE-OUT","distance_m":25,"props":{"wheelchair":"easy","width_m":3.0}},
    {"from":"PLAT-YAMANOTE-OUT","to":"PLAT-SAIKYO","distance_m":40,"props":{"wheelchair":"easy","width_m":2.0}}
  ]
}
