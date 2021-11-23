export const MODULE_NAME = "FVTT Encounter Stats";
export const MODULE_ID = "fvtt-encounter-stats";

export const STORAGE_NAME = "fvtt-encounter-stats-data";
export const STORAGE_NAME_CAMPAIGN_DATA =
  "do-not-delete-fvtt-encounter-stats-data-campaign";
export const STORAGE_NAME_CAMPAIGN_ID = "Campaign Statistics";

export const OPT_ENABLE = "enable";
export const OPT_ENABLE_AOE_DAMAGE = "enable_aoe_damage";
export const OPT_ENABLE_MONSTER_STATS = "enable_monster_stats";
export const OPT_ENABLE_JOURNAL_NOTIFICATION = "enable_journal_notification";
export const OPT_TOGGLE_CAMPAIGN_TRACKING = "toggle_campaign_tracking_name";

export const OPT_REPORT_BUG = "report_bug";

export const ROLL_HOOK = {
  MIDI_QOL: "midi-qol",
  BETTERROLLS5E: "betterrolls5e",
  BEYOND_20: "beyond20",
  MARS5E: "mars-5e",
  DEFAULT: "default",
};

export const ATTACKTYPES = {
  INFO: "info",
  ATTACK: "attack",
  DAMAGE_FORMULA: "damage-formula",
  DAMAGE: "damage",
  NONE: "none",
};

export const ATTACK_DATA_TEMPLATE = {
  id: null,
  actionType: null,
  round: null,
  tokenId: null,
  actorId: null,
  advantage: false,
  isCritical: false,
  isFumble: false,
  disadvantage: false,
  attackTotal: 0,
  damageTotal: 0,
  item: {
    name: null,
    itemLink: null,
  },
};

export const HEALTH_DATA_TEMPLATE = {
  id: null,
  round: null,
  tokenId: null,
  actorId: null,
  max: 0,
  diff: 0,
  previous: 0,
  current: 0,
  isdamage: false,
  isheal: false,
};

export const KILLED_DATA_TEMPLATE = {
  round: null,
  tokenName: null,
};
