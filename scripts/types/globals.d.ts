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

  interface CustomDataEvent {
    EventName: string;
    FlavorText: string;
    actorName?: string;
    date: string;
  }

  interface CampaignStat {
    id: string;
    dateDisplay: string;
    data: Array<DiceTrack> | Array<CustomDataEvent>;
  }

  interface CampaignStats {
    nat1: Array<CampaignStat>;
    nat20: Array<CampaignStat>;
    heals: Array<CampaignStat>;
    kills: Array<CampaignStat>;
    custom: Array<CampaignStat>;
  }

  interface DateOptions {
    id: string;
    dateTimeDisplay: string;
    dateDisplay: string;
  }

  interface DiceTrackParse {
    name: string;
    flavor: string;
    isCritical: boolean;
    isFumble: boolean;
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

  interface EncounterOverview {
    start: string;
    end: string;
    realDate: string;
    scene: {
      id: string;
      name: string;
      thumb: string;
    };
  }

  interface Enemies {
    tokenId: string;
    name: string;
    img: string;
    ac: number;
    hp: number;
  }

  interface Encounter {
    encounterId?: string;
    overview: EncounterOverview;
    round: number;
    enemies: Array<Enemies>;
    combatants: Array<EncounterCombatant>;
    top: EncounterTop;
    templateHealthCheck: Array<HealthCheck>;
  }

  interface EncounterTop {
    maxDamage: string;
    mostDamageInOneTurn: string;
    highestAvgDamage: string;
    highestMaxDamage: string;
    mostKills: string;
    mostHealing: string;
    mostSupportActions: string;
    mostBattlefieldActions: string;
  }

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
    abilities: CombatantAbilities;
    events: Array<CombatantEvent>;
    health: Array<CombatantHealthData>;
    kills: Array<CombatantKills>;
    summaryList: CombatantEventSummaryList;
    roundSummary: EncounterRoundSummary;
  }

  interface CombatantAbilities {
    cha: number;
    con: number;
    dex: number;
    int: number;
    str: number;
    wis: number;
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

  interface HealthCheck {
    name: string;
  }

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
