export const HookDND5e_rollDamage_damageroll_nulls: Roll = {
  class: "DamageRoll",
  options: {
    flavor: "Fire Bolt - Damage Roll (Fire)",
    rollMode: "publicroll",
    multiplyNumeric: false,
    powerfulCritical: false,
    preprocessed: true,
    configured: true,
  },
  dice: [],
  formula: "6d10[fire]",
  terms: [
    {
      class: "Die",
      options: {
        flavor: "fire",
        baseNumber: 3,
        critical: true,
      },
      evaluated: true,
      number: 6,
      faces: 10,
      modifiers: [],
      results: [
        {
          result: 1,
          active: true,
        },
        {
          result: 7,
          active: true,
        },
        {
          result: 7,
          active: true,
        },
        {
          result: 2,
          active: true,
        },
        {
          result: 7,
          active: true,
        },
        {
          result: 9,
          active: true,
        },
      ],
    },
  ],
  total: undefined,
  evaluated: true,
};
