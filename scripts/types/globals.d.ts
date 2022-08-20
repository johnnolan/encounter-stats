type RollModuleType = "default" | "midi";

type CombatantType = "character" | "npc";

type AttackTypes = "mwak" | "rwak" | "msak" | "rsak" | "save" | "heal";

type ValidAttackTypes =
  | AttackTypes.mwak
  | AttackTypes.rwak
  | AttackTypes.msak
  | AttackTypes.rsak
  | AttackTypes.save;

type ValidHealingTypes = AttackTypes.heal;

export interface EventItem {
  item: {
    itemLink: string;
    name: string;
  };
}

export interface CombatantEvent {
  id: string;
  actionType: AttackTypes;
  round: string;
  advantage: boolean;
  disadvantage: boolean;
  attackTotal: string;
  damageTotal: string;
  tokenId: string;
  actorId: string;
  isCritical: boolean;
  isFumble: boolean;
  item: EventItem;
}

export interface CombatantHealthData {
  id: string;
  round: string;
  tokenId: string;
  actorId: string;
  max: number;
  diff: number;
  previous: number;
  current: number;
  isdamage: boolean;
  isheal: boolean;
}

export interface CombatantKills {
  round: string,
  tokenName: string,
};

export interface Combatant {
  name: string;
  id: string;
  tokenId: string;
  img: string;
  type: string;
  hp: number;
  max: number;
  ac: nuber;
  events: Array<CombatantEvent>;
  health: Array<CombatantHealthData>;
  kills: Array<CombatantKills>;
  summaryList: CombatantEventSummaryList;
  roundSummary: {
    totals: [
      {
        round: number;
        damageTotal: number;
      }
    ];
  };
}

export interface CombatantEventSummaryList {
  min: number;
  max: number;
  avg: number;
  total: number;
}

type HealthCheck = {
  name: string;
};

type Encounter = {
  encounterId: string;
  round: number;
  combatants: Array<Combatant>;
  top: {
    maxDamage: string;
    mostDamageInOneTurn: string;
    highestAvgDamage: string;
    highestMaxDamage: string;
  };
  templateHealthCheck: Array<HealthCheck>;
};
