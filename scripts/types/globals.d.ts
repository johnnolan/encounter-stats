export interface CampaignStats {
  nat1: [
    {
      id: string;
      dateDisplay: string;
      data: Array<DiceTrack>;
    }
  ];
  nat20: [
    {
      id: string;
      dateDisplay: string;
      data: Array<DiceTrack>;
    }
  ];
  heals: [
    {
      id: string;
      dateDisplay: string;
      data: Array<HealTrack>;
    }
  ];
  kills: [
    {
      id: string;
      dateDisplay: string;
      data: Array<KillTrack>;
    }
  ];
}

type DiceTrack = {
  actorName: string;
  flavor: string;
  date: string;
};

type HealTrack = {
  actorName: string;
  itemLink: string;
  spellName: string;
  total: number;
  date: string;
};

type KillTrack = {
  actorName: string;
  tokenName: string;
  date: string;
};

type DiceTrackParse = {
  name: string;
  flavor: string;
  isCritical: boolean;
  isFumble: boolean;
};

export interface MidiQolWorkflow {
  id: string;
  actor: {
    id: string;
  };
  item: MidiQolEventItem;
  attackRoll: {
    options: {
      advantageMode: number;
    };
    total: number;
  };
  damageRoll: number;
  damageTotal: number;
  attackTotal: number;
  workflowType: string;
  isCritical: boolean;
  isFumble: boolean;
  applicationTargets: [
    {
      id: string;
      sheet: {
        actor: {
          name: string;
          system: {
            attributes: {
              ac: {
                value: number;
              };
            };
          };
        };
      };
    }
  ];
}
export interface MidiQolEventItem {
  id: string;
  name: string;
  link: string;
  type: string;
  img: string;
  system: {
    actionType: string;
  };
}

export interface EncounterWorkflow {
  id: string;
  actor: {
    id: string;
  };
  item: EventItem;
  attackRoll: number;
  damageRoll: number;
  damageTotal: number;
  damageMultipleEnemiesTotal: number;
  attackTotal: number;
  workflowType: string;
  advantage: boolean;
  disadvantage: boolean;
  isCritical: boolean;
  isFumble: boolean;
  actionType: string;
  enemyHit: Array<EnemyHit>;
  type: string?;
}

type Encounter = {
  encounterId?: string;
  round: number;
  combatants: Array<EncounterCombatant>;
  top: EncounterTop;
  templateHealthCheck: Array<HealthCheck>;
};

type EncounterTop = {
  maxDamage: string;
  mostDamageInOneTurn: string;
  highestAvgDamage: string;
  highestMaxDamage: string;
  mostKills: string;
  mostHealing: string;
  mostSupportActions: string;
  mostBattlefieldActions: string;
};

export interface CombatantEvent {
  id: string;
  actionType: AttackTypes;
  advantage: boolean;
  disadvantage: boolean;
  attackTotal: number;
  damageTotal: number;
  tokenId: string;
  actorId: string;
  isCritical: boolean;
  isFumble: boolean;
  item: EventItem;
  round: number;
  enemyHit: Array<EnemyHit>;
}

export interface EncounterCombatant {
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
  roundSummary: EncounterRoundSummary;
}

export interface EncounterRoundSummary {
  totals: Array<EncounterRoundTotal>;
}

export interface EncounterRoundTotal {
  round: number;
  damageTotal: number;
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

export interface EventItem {
  id: string;
  name: string;
  link: string;
  type: string;
  img: string;
}

export interface EnemyHit {
  tokenId: string;
  name: string;
}

export interface CombatantHealthData {
  id: string;
  round: number;
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
  round: number;
  tokenName: string;
}
