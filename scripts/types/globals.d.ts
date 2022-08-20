type CombatantType = "character" | "npc";

type AttackTypes = "mwak" | "rwak" | "msak" | "rsak" | "save" | "heal";

type ValidAttackTypes = AttackTypes.mwak | AttackTypes.rwak | AttackTypes.msak | AttackTypes.rsak | AttackTypes.save;

type ValidHealingTypes = AttackTypes.heal;

type Combatant = {
  name: string,
  id: string,
  tokenId: string,
  img: string,
  type: string,
  hp: number,
  max: number,
  ac: nuber,
  events: Array<string>,
  health: Array<string>,
  kills: Array<string>,
  summaryList: {
    min: number,
    max: number,
    avg: number,
    total: number,
  },
  roundSummary: {
    totals: [
      {
        round: number,
        damageTotal: number,
      },
    ],
  },
}

type HealthCheck = {
  name: string
}

type Encounter = {
  encounterId: string,
  round: number,
  combatants: Array<Combatant>,
  top: {
    maxDamage: string,
    mostDamageInOneTurn: string,
    highestAvgDamage: string,
    highestMaxDamage: string,
  },
  templateHealthCheck: Array<HealthCheck>,
};

type ModuleSetup = {
  actor: {
    name: string;
  };
  settings: {
    isValid: boolean;
    hasWildMagicFeat: boolean;
    hasTidesOfChaosResource: boolean;
    hasTidesOfChaosFeat: boolean;
  };
};

type HookValue = {
  value: string | boolean | number;
};

type HookSurgeValue = {
  surge: boolean;
  result: string | undefined;
  tokenId: string;
};

type FlagValue = {
  max?: number;
  min?: number;
  value: number;
  dieValue?: DieValue;
};
