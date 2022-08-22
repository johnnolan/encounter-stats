type RollModuleType = "default" | "midi";

type AttackTypes = "mwak" | "rwak" | "msak" | "rsak" | "save" | "heal";

type ValidAttackTypes =
  | AttackTypes.mwak
  | AttackTypes.rwak
  | AttackTypes.msak
  | AttackTypes.rsak
  | AttackTypes.save;

type ValidHealingTypes = AttackTypes.heal;

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

export interface EncounterMidiWorkflow {
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
}

export interface EventItem {
  id: string;
  name: string;
  link: string;
  type: string;
  img: string;
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

export interface EnemyHit {
  tokenId: string;
  name: string;
}

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
  encounterId?: string;
  round: number;
  combatants: Array<EncounterCombatant>;
  top: {
    maxDamage: string;
    mostDamageInOneTurn: string;
    highestAvgDamage: string;
    highestMaxDamage: string;
  };
  templateHealthCheck: Array<HealthCheck>;
};
