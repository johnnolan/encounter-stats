export const HookDND5e_rollAttack_d20roll: Roll = {
  class: "D20Roll",
  options: {
    flavor: "Fire Bolt - Attack Roll",
    advantageMode: 1,
    defaultRollMode: "publicroll",
    rollMode: "publicroll",
    critical: 20,
    fumble: 1,
    halflingLucky: false,
    configured: true,
  },
  dice: [],
  formula: "2d20kh + 0 + 2 + 4",
  terms: [
    {
      class: "Die",
      options: {
        critical: 20,
        fumble: 1,
        advantage: true,
      },
      evaluated: true,
      number: 2,
      faces: 20,
      modifiers: ["kh"],
      results: [
        {
          result: 3,
          active: false,
          discarded: true,
        },
        {
          result: 14,
          active: true,
        },
      ],
    },
    {
      class: "OperatorTerm",
      options: {},
      evaluated: true,
      operator: "+",
    },
    {
      class: "NumericTerm",
      options: {},
      evaluated: true,
      number: 0,
    },
    {
      class: "OperatorTerm",
      options: {},
      evaluated: true,
      operator: "+",
    },
    {
      class: "NumericTerm",
      options: {},
      evaluated: true,
      number: 2,
    },
    {
      class: "OperatorTerm",
      options: {},
      evaluated: true,
      operator: "+",
    },
    {
      class: "NumericTerm",
      options: {},
      evaluated: true,
      number: 4,
    },
  ],
  total: 20,
  evaluated: true,
};
