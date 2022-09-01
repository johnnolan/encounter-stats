import PF1 from "./PF1";
import { chatActor } from "../mockdata/chatActor";
import { ChatMessageType } from "../enums";

const chatMessageItem: ChatMessage = {
  content: '<div data-item-id="C3c6l9SPMCqMiceV"></div>',
  speaker: {
    actor: "5H4YnyD6zf9vcJ3P",
  },
  user: {
    targets: [
      {
        id: "tokenId",
        name: "Acolyte",
      },
    ],
  },
  flags: {},
};

const chatMessageItemAttack: ChatMessage = {
  speaker: {
    actor: "5H4YnyD6zf9vcJ3P",
  },
  user: {
    targets: [
      {
        id: "tokenId",
        name: "Acolyte",
      },
    ],
  },
  flags: {
    pf1: {
      metadata: {
        item: "hQ0uXGQCnFgdWpSf",
        template: null,
        rolls: {
          attacks: {
            "0": {
              attack: {
                class: "RollPF",
                options: {},
                dice: [],
                formula: "1d20 + 1[Base Attack Bonus]",
                terms: [
                  {
                    class: "Die",
                    options: {},
                    evaluated: true,
                    number: 1,
                    faces: 20,
                    modifiers: [],
                    results: [
                      {
                        result: 1,
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
                    options: {
                      flavor: "Base Attack Bonus",
                    },
                    evaluated: true,
                    number: 1,
                  },
                ],
                total: 2,
                evaluated: true,
              },
              damage: {
                "0": {
                  damageType: {
                    values: ["bludgeoning"],
                    custom: "",
                  },
                  roll: {
                    class: "RollPF",
                    options: {},
                    dice: [],
                    formula: "1d6 + 0[Strength]",
                    terms: [
                      {
                        class: "Die",
                        options: {},
                        evaluated: true,
                        number: 1,
                        faces: 6,
                        modifiers: [],
                        results: [
                          {
                            result: 1,
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
                        options: {
                          flavor: "Strength",
                        },
                        evaluated: true,
                        number: 0,
                      },
                    ],
                    total: 1,
                    evaluated: true,
                  },
                },
              },
              critConfirm: null,
              critDamage: {},
            },
          },
        },
        targets: [],
      },
    },
  },
};

const chatMessageItemDamage: ChatMessage = {
  id: "",
  speaker: {
    actor: "5H4YnyD6zf9vcJ3P",
  },
  user: {
    targets: [
      {
        id: "tokenId",
        name: "Acolyte",
      },
    ],
  },
  flags: {
    pf1: {
      metadata: {
        item: "C3c6l9SPMCqMiceV",
        template: null,
        rolls: {
          attacks: {
            "0": {
              attack: {
                class: "RollPF",
                options: {},
                dice: [],
                formula: "1d20 + 1[Base Attack Bonus]",
                terms: [
                  {
                    class: "Die",
                    options: {},
                    evaluated: true,
                    number: 1,
                    faces: 20,
                    modifiers: [],
                    results: [
                      {
                        result: 1,
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
                    options: {
                      flavor: "Base Attack Bonus",
                    },
                    evaluated: true,
                    number: 1,
                  },
                ],
                total: 2,
                evaluated: true,
              },
              damage: {
                "0": {
                  damageType: {
                    values: ["bludgeoning"],
                    custom: "",
                  },
                  roll: {
                    class: "RollPF",
                    options: {},
                    dice: [],
                    formula: "1d6 + 0[Strength]",
                    terms: [
                      {
                        class: "Die",
                        options: {},
                        evaluated: true,
                        number: 1,
                        faces: 6,
                        modifiers: [],
                        results: [
                          {
                            result: 1,
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
                        options: {
                          flavor: "Strength",
                        },
                        evaluated: true,
                        number: 0,
                      },
                    ],
                    total: 1,
                    evaluated: true,
                  },
                },
              },
              critConfirm: null,
              critDamage: {},
            },
          },
        },
        targets: [],
      },
    },
  },
};

describe("PF1", () => {
  describe("ParseChatMessage", () => {
    describe("If it is a standard role", () => {
      beforeEach(() => {
        (global as any).game = {
          actors: {
            get: jest.fn().mockReturnValue(chatActor),
          },
        };
      });
      test("it returns the correct EncounterWorkflow", async () => {
        const result = await PF1.ParseChatMessage(chatMessageItemDamage);
        expect(result).toStrictEqual(<EncounterWorkflow>{
          id: `5H4YnyD6zf9vcJ3PC3c6l9SPMCqMiceV`,
          actionType: "attack",
          actor: {
            id: "5H4YnyD6zf9vcJ3P",
          },
          item: {
            id: "C3c6l9SPMCqMiceV",
            name: "Flame Tongue Greatsword",
            link: "@Compendium[dnd5e.items.WWb4vAmh18sMAxfY]{Flame Tongue Greatsword}",
            type: "sword",
            img: "itemImageUrl",
            system: {
              actionType: "mwak",
            },
          },
          enemyHit: [
            {
              name: "Acolyte",
              tokenId: "tokenId",
            },
          ],
          isCritical: false,
          isFumble: true,
          attackRoll: 2,
          attackTotal: 2,
          damageTotal: 1,
          type: ChatMessageType.PF1,
        });
      });
    });
  });
});
