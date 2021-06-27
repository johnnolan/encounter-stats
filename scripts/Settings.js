export const MODULE_NAME = "FVTT Encounter Stats";
export const MODULE_ID = "fvtt-encounter-stats";

export const OPT_ENABLE = "enable";
export const OPT_ENABLE_AOE_DAMAGE = "enable_aoe_damage";

export const ROLL_HOOK = {
  MIDI_QOL: "midi-qol",
  BETTERROLLS5E: "betterrolls5e",
  BEYOND_20: "beyond20",
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
