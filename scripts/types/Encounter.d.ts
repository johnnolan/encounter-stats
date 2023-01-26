interface Encounter {
  encounterId?: string;
  overview: EncounterOverview;
  round: number;
  enemies: Array<Enemies>;
  combatants: Array<EncounterCombatant>;
  top: EncounterTop;
  templateHealthCheck: Array<HealthCheck>;
  partySummary: PartyEncounterStats;
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

interface PartyEncounterStats {
  averageDamagePerRound: number;
  lowestDamagePerRound: number;
  highestDamagePerRound: number;
  totalDamage: number;
  totalDamagePerRound: Array<RoundDamage>;
}

interface HealthCheck {
  name: string;
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

interface CombatantKills {
  round: number;
  tokenName: string;
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

interface CombatantEventSummaryList {
  min: number;
  max: number;
  avg: number;
  total: number;
}

interface EncounterRoundSummary {
  totals: Array<EncounterRoundTotal>;
}

interface EncounterRoundTotal {
  round: number;
  damageTotal: number;
}

interface CombatantAbilities {
  cha: number;
  con: number;
  dex: number;
  int: number;
  str: number;
  wis: number;
}
interface Enemies {
  tokenId: string;
  name: string;
  img: string;
  ac: number;
  hp: number;
}
