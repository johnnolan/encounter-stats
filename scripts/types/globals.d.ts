type SurgeType = "WMS" | "POWM" | "TOCSURGE";

type Comparison = "EQ" | "GT" | "LT";

type DieValue = undefined | "1d20" | "1d12" | "1d10" | "1d8" | "1d6" | "1d4";

type TidesItemData = {
  hasTidesOfChaosResource: boolean;
  hasTidesOfChaosFeat: boolean;
  isValid: boolean;
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
