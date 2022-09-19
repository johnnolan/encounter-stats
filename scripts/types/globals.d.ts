import { CombatDetailType } from "../enums";

declare global {
  interface LenientGlobalVariableTypes {
    game: never; // the type doesn't matter
  }
  interface Window {
    Hooks: typeof Hooks;
    SimpleCalendar: {
      api: {
        getCurrentDay: () => {
          name: string;
        };
        getCurrentMonth: () => {
          name: string;
        };
        getCurrentYear: () => {
          numericRepresentation: number;
          postfix: string;
        };
      };
    };
  }
  interface HookRenderCombatTrackerData {
    user: User;
    combats: Array<Combat>;
    combatCount: number;
    hasCombat: boolean;
    combat: Combat;
  }

  interface CustomEvent {
    EventId: string;
    DataValue: string | number;
    FlavorText: string;
    actorId?: string;
  }

  interface HookUpdateCombatRound {
    round: number;
    turn: number;
  }

  interface CampaignStat {
    id: string;
    dateDisplay: string;
    data: Array<DiceTrack>;
  }

  interface CampaignStats {
    nat1: Array<CampaignStat>;
    nat20: Array<CampaignStat>;
    heals: Array<CampaignStat>;
    kills: Array<CampaignStat>;
  }

  type DateOptions = {
    id: string;
    dateTimeDisplay: string;
    dateDisplay: string;
  };

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

  interface MidiQolWorkflow {
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
    damageTotal: number;
    attackTotal: number;
    workflowType: string;
    isCritical: boolean;
    isFumble: boolean;
    targets: Array<{
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
    }>;
  }

  interface MidiQolEventItem {
    id: string;
    name: string;
    link: string;
    type: string;
    img: string;
    system: {
      actionType: string;
    };
  }

  interface EncounterWorkflow {
    id: string;
    actor: {
      id: string;
    };
    item?: EventItem;
    damageTotal?: number;
    damageMultipleEnemiesTotal?: number;
    attackTotal?: number;
    workflowType?: string;
    advantage?: boolean;
    disadvantage?: boolean;
    isCritical?: boolean;
    isFumble?: boolean;
    actionType?: string;
    enemyHit?: Array<EnemyHit>;
    type: CombatDetailType;
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

  interface CombatantEvent {
    id: string;
    actionType: AttackTypes;
    advantage?: boolean;
    disadvantage?: boolean;
    attackTotal?: number;
    damageTotal?: number;
    tokenId: string;
    actorId: string;
    isCritical?: boolean;
    isFumble?: boolean;
    damageMultipleEnemiesTotal?: number;
    item?: EventItem;
    round: number;
    enemyHit?: Array<EnemyHit>;
  }

  interface EncounterCombatant {
    name: string;
    id: string;
    tokenId: string;
    img: string;
    type: string;
    hp: number;
    max: number;
    ac: number;
    initiative: number | null;
    events: Array<CombatantEvent>;
    health: Array<CombatantHealthData>;
    kills: Array<CombatantKills>;
    summaryList: CombatantEventSummaryList;
    roundSummary: EncounterRoundSummary;
  }

  interface EncounterRoundSummary {
    totals: Array<EncounterRoundTotal>;
  }

  interface EncounterRoundTotal {
    round: number;
    damageTotal: number;
  }

  interface CombatantEventSummaryList {
    min: number;
    max: number;
    avg: number;
    total: number;
  }

  type HealthCheck = {
    name: string;
  };

  interface EventItem {
    id: string;
    name: string;
    link: string;
    type: string;
    img: string;
  }

  interface EnemyHit {
    tokenId: string;
    name: string;
  }

  interface CombatantHealthData {
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

  interface CombatantKills {
    round: number;
    tokenName: string;
  }
}

export {};
