import { CombatDetailType } from "../enums";
import MidiQol from "./MidiQol";

const midiWorkflow: MidiQolWorkflow = {
  id: "d75gppsau45ypm2m",
  actor: {
    id: "5H4YnyD6zf9vcJ3P",
    type: "character",
    prototypeToken: {
      name: "Graa Token Name",
    }
  },
  isCritical: false,
  isFumble: false,
  attackRoll: {
    total: 18,
    options: {
      advantageMode: 1,
    },
  },
  workflowType: "test",
  attackTotal: 12,
  damageTotal: 21,
  item: {
    id: "itemId",
    name: "Flame Tongue Greatsword",
    link: "@Compendium[dnd5e.items.WWb4vAmh18sMAxfY]{Flame Tongue Greatsword}",
    type: "sword",
    img: "itemImageUrl",
    system: {
      actionType: "mwak",
    },
  },
  hitTargets: new Set([{}, {}]),
  targets: [
    {
      id: "tokenId",
      sheet: {
        actor: {
          name: "Acolyte",
          system: {
            attributes: {
              ac: {
                value: 10,
              },
            },
          },
        },
      },
    },
    {
      id: "tokenId2",
      sheet: {
        actor: {
          name: "Troll",
          system: {
            attributes: {
              ac: {
                value: 8,
              },
            },
          },
        },
      },
    },
  ],
};

const midiWorkflowDisadvantage: MidiQolWorkflow = {
  id: "d75gppsau45ypm2m",
  actor: {
    id: "5H4YnyD6zf9vcJ3P",
    type: "character",
  },
  isCritical: false,
  isFumble: false,
  attackRoll: {
    total: 18,
    options: {
      advantageMode: -1,
    },
  },
  workflowType: "test",
  attackTotal: 12,
  damageTotal: 21,
  item: {
    id: "itemId",
    name: "Flame Tongue Greatsword",
    link: "@Compendium[dnd5e.items.WWb4vAmh18sMAxfY]{Flame Tongue Greatsword}",
    type: "sword",
    img: "itemImageUrl",
    system: {
      actionType: "mwak",
    },
  },
  hitTargets: new Set([{}, {}]),
  targets: [
    {
      id: "tokenId",
      sheet: {
        actor: {
          name: "Acolyte",
          system: {
            attributes: {
              ac: {
                value: 10,
              },
            },
          },
        },
      },
    },
    {
      id: "tokenId2",
      sheet: {
        actor: {
          name: "Troll",
          system: {
            attributes: {
              ac: {
                value: 8,
              },
            },
          },
        },
      },
    },
  ],
};

const midiWorkflowNoDiceRoll: MidiQolWorkflow = {
  id: "d75gppsau45ypm2m",
  actor: {
    id: "5H4YnyD6zf9vcJ3P",
    type: "character",
  },
  isCritical: false,
  isFumble: false,
  workflowType: "test",
  item: {
    id: "itemId",
    name: "Flame Tongue Greatsword",
    link: "@Compendium[dnd5e.items.WWb4vAmh18sMAxfY]{Flame Tongue Greatsword}",
    type: "sword",
    img: "itemImageUrl",
    system: {
      actionType: "mwak",
    },
  },
  hitTargets: new Set([{}, {}]),
  targets: [
    {
      id: "tokenId",
      sheet: {
        actor: {
          name: "Acolyte",
          system: {
            attributes: {
              ac: {
                value: 10,
              },
            },
          },
        },
      },
    },
  ],
};

const midiWorkflowNoDiceRollNpc: MidiQolWorkflow = {
  id: "d75gppsau45ypm2m",
  actor: {
    id: "5H4YnyD6zf9vcJ3P",
    type: "npc",
  },
  isCritical: false,
  isFumble: false,
  workflowType: "test",
  item: {
    id: "itemId",
    name: "Flame Tongue Greatsword",
    link: "@Compendium[dnd5e.items.WWb4vAmh18sMAxfY]{Flame Tongue Greatsword}",
    type: "sword",
    img: "itemImageUrl",
    system: {
      actionType: "mwak",
    },
  },
  hitTargets: new Set([{}, {}]),
  targets: [
    {
      id: "tokenId",
      sheet: {
        actor: {
          name: "Acolyte",
          system: {
            attributes: {
              ac: {
                value: 10,
              },
            },
          },
        },
      },
    },
  ],
};

describe("MidiQol", () => {
  describe("ParseWorkflow", () => {
    describe("If it has a attack and damage roll", () => {
      test("it returns the correct EncounterMidiWorkflow", async () => {
        const result: EncounterWorkflow = MidiQol.ParseWorkflow(midiWorkflow);
        expect(result).toStrictEqual(<EncounterWorkflow>{
          id: "d75gppsau45ypm2m",
          actionType: "mwak",
          actor: {
            id: "5H4YnyD6zf9vcJ3P",
          },
          advantage: true,
          isCritical: false,
          isFumble: false,
          disadvantage: false,
          damageMultipleEnemiesTotal: 42,
          workflowType: "test",
          attackTotal: 12,
          diceTotal: undefined,
          damageTotal: 21,
          item: {
            id: "itemId",
            name: "Flame Tongue Greatsword",
            link: "@Compendium[dnd5e.items.WWb4vAmh18sMAxfY]{Flame Tongue Greatsword}",
            type: "sword",
            img: "itemImageUrl",
          },
          enemyHit: [
            {
              name: "Acolyte",
              tokenId: "tokenId",
            },
            {
              name: "Troll",
              tokenId: "tokenId2",
            },
          ],
          type: CombatDetailType.MidiQol,
        });
      });
    });

    describe("If it has a attack and damage roll with disadvantage", () => {
      test("it returns the correct EncounterMidiWorkflow", async () => {
        const result: EncounterWorkflow = MidiQol.ParseWorkflow(midiWorkflowDisadvantage);
        expect(result).toStrictEqual(<EncounterWorkflow>{
          id: "d75gppsau45ypm2m",
          actionType: "mwak",
          actor: {
            id: "5H4YnyD6zf9vcJ3P",
          },
          advantage: false,
          isCritical: false,
          isFumble: false,
          disadvantage: true,
          diceTotal: undefined,
          damageMultipleEnemiesTotal: 42,
          workflowType: "test",
          attackTotal: 12,
          damageTotal: 21,
          item: {
            id: "itemId",
            name: "Flame Tongue Greatsword",
            link: "@Compendium[dnd5e.items.WWb4vAmh18sMAxfY]{Flame Tongue Greatsword}",
            type: "sword",
            img: "itemImageUrl",
          },
          enemyHit: [
            {
              name: "Acolyte",
              tokenId: "tokenId",
            },
            {
              name: "Troll",
              tokenId: "tokenId2",
            },
          ],
          type: CombatDetailType.MidiQol,
        });
      });
    });

    describe("If it has no attack and damage roll", () => {
      test("it returns the correct EncounterMidiWorkflow", async () => {
        const result: EncounterWorkflow = MidiQol.ParseWorkflow(
          midiWorkflowNoDiceRoll
        );
        expect(result).toStrictEqual(<EncounterWorkflow>{
          id: "d75gppsau45ypm2m",
          actionType: "mwak",
          actor: {
            id: "5H4YnyD6zf9vcJ3P",
          },
          advantage: false,
          isCritical: false,
          isFumble: false,
          diceTotal: undefined,
          disadvantage: false,
          damageMultipleEnemiesTotal: 0,
          workflowType: "test",
          attackTotal: 0,
          damageTotal: 0,
          item: {
            id: "itemId",
            name: "Flame Tongue Greatsword",
            link: "@Compendium[dnd5e.items.WWb4vAmh18sMAxfY]{Flame Tongue Greatsword}",
            type: "sword",
            img: "itemImageUrl",
          },
          enemyHit: [
            {
              name: "Acolyte",
              tokenId: "tokenId",
            },
          ],
          type: CombatDetailType.MidiQol,
        });
      });
    });
  });

  describe("RollCheck", () => {
    describe("if the check contains a valid actorId", () => {
      beforeEach(() => {
        (global as any).game = {
          actors: {
            get: jest.fn().mockReturnValue({
              id: "actorId",
              name: "Actor Name",
              type: "character",
              prototypeToken: {
                name: "Actor Name Token"
              }
            }),
          },
        };
      });

      test("it returns the correct EncounterMidiWorkflow", async () => {
        const result = MidiQol.RollCheck(midiWorkflow);
        expect(result).toStrictEqual(<DiceTrackParse>{
          isCritical: false,
          isFumble: false,
          flavor: "Flame Tongue Greatsword",
          name: "Actor Name",
          tokenName: "Actor Name Token",
        });
      });
    });

    describe("if the check doesn't contain a valid actorId", () => {
      beforeEach(() => {
        (global as any).game = {
          actors: {
            get: jest.fn().mockReturnValue(undefined),
          },
        };
      });

      test("it returns the correct EncounterMidiWorkflow", async () => {
        const result = MidiQol.RollCheck(midiWorkflow);
        expect(result).toBeUndefined();
      });
    });

    describe("if its an npc", () => {
      beforeEach(() => {
        (global as any).game = {
          actors: {
            get: jest.fn().mockReturnValue({
              id: "5H4YnyD6zf9vcJ3P",
              type: "npc",
            }),
          },
        };
      });

      test("it should return undefined", async () => {
        const result = MidiQol.RollCheck(midiWorkflowNoDiceRollNpc);
        expect(result).toBeUndefined();
      });
    });
  });
});
