export const MODULE_NAME = "FVTT Encounter Statistics";
export const MODULE_ID = "encounter-stats";

export const STORAGE_NAME = "encounter-stats-data";
export const STORAGE_NAME_CAMPAIGN_DATA =
  "do-not-delete-encounter-stats-data-campaign";
export const STORAGE_NAME_CAMPAIGN_ID = "Campaign Statistics";

export const OPT_ENABLE = "enable";
export const OPT_ENABLE_AOE_DAMAGE = "enable_aoe_damage";
export const OPT_ENABLE_JOURNAL_NOTIFICATION = "enable_journal_notification";
export const OPT_TOGGLE_CAMPAIGN_TRACKING = "toggle_campaign_tracking_name";
export const OPT_ENABLE_SIMPLE_CALENDAR_INTEGRATION =
  "enable_simple_calendar_integration";

export const OPT_REPORT_BUG = "report_bug";

export const ROLL_HOOK = {
  MIDI_QOL: "midi-qol",
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

export const CombatantType = {
  character: "character",
  npc: "npc",
}
