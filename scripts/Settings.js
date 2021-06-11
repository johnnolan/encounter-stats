export const MODULE_NAME = "FVTT Encounter Stats";
export const MODULE_ID = "fvtt-encounter-stats";

export const OPT_ENABLE = "enable";

export const ROLL_HOOK = {
  MIDI_QOL: "midi-qol",
  BETTERROLLS5E: "betterrolls5e",
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
