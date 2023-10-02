export enum CombatDetailType {
  Damage = "damage",
  Attack = "attack",
  ItemCard = "itemCard",
  MidiQol = "midiqol",
  ReadySetRoll = "readysetroll",
  None = "none",
}

export enum ChatRollMode {
  selfroll = "selfroll",
  publicroll = "publicroll",
  gmroll = "gmroll",
  blindroll = "blindroll",
}

export enum RoleType {
  Fumble = "fumble",
  Critial = "critical",
}

export enum CombatantType {
  Character = "character",
  NPC = "npc",
}

export enum ValidHeals {
  heal = 1,
}

export enum ValidAttacks {
  mwak = 1,
  rwak = 2,
  msak = 3,
  rsak = 4,
  save = 5,
}

export enum ValidRollEvent {
  mwak = 1,
  rwak = 2,
  msak = 3,
  rsak = 4,
  save = 5,
  heal = 6,
}

export enum ChatType {
  DND5e = 1,
  MidiQol = 2,
  PF2e = 3,
  RSR = 4,
}
