import Stat from "./Stat";
import Logger from "../Helpers/Logger";
jest.mock("../StatManager");
import StatManager from "../StatManager";
import { actor, actorTwo, actorThree } from "../mockdata/actors";
import { CombatDetailType } from "../enums";

const mockLoggerLog = jest.fn();
const mockLoggerWarn = jest.fn();
Logger.log = mockLoggerLog;
Logger.warn = mockLoggerWarn;

beforeEach(() => {
  mockLoggerWarn.mockClear();
  mockLoggerLog.mockClear();
});

const encounter: Encounter = {
  encounterId: "t98gppsau45ypm3t",
  round: 1,
  combatants: [],
  top: {
    maxDamage: "",
    mostDamageInOneTurn: "",
    highestAvgDamage: "",
    highestMaxDamage: "",
    mostKills: "",
    mostHealing: "",
    mostSupportActions: "",
    mostBattlefieldActions: "",
  },
  templateHealthCheck: [],
};

const encounterMidiWorkflow: EncounterWorkflow = {
  id: "d75gppsau45ypm2m",
  actionType: "mwak",
  actor: {
    id: "eMyoELkOwFNPGEK8",
  },
  advantage: true,
  isCritical: false,
  isFumble: false,
  disadvantage: false,
  damageMultipleEnemiesTotal: 0,
  workflowType: "test",
  attackTotal: 12,
  damageTotal: 20,
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
};

const encounterMidiWorkflow2: EncounterWorkflow = {
  id: "d75gppsau45ypm2b",
  actionType: "mwak",
  actor: {
    id: "eMyoELkOwFNPGEK8",
  },
  advantage: true,
  isCritical: false,
  isFumble: false,
  disadvantage: false,
  damageMultipleEnemiesTotal: 0,
  workflowType: "test",
  attackTotal: 12,
  damageTotal: 15,
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
};

const encounterMidiWorkflowHeal: EncounterWorkflow = {
  id: "d75gppsau45ypm2c",
  actionType: "heal",
  actor: {
    id: "eMyoELkOwFNPGEK8",
  },
  advantage: true,
  isCritical: false,
  isFumble: false,
  disadvantage: false,
  damageMultipleEnemiesTotal: 0,
  workflowType: "test",
  attackTotal: 12,
  damageTotal: 15,
  item: {
    id: "itemId",
    name: "Flame Tongue Greatsword",
    link: "@Compendium[dnd5e.items.WWb4vAmh18sMAxfY]{Flame Tongue Greatsword}",
    type: "sword",
    img: "itemImageUrl",
  },
  type: CombatDetailType.MidiQol,
};

describe("Stat", () => {
  describe("If it is a new encounter", () => {
    let stat: Stat;
    const encounterId = "encounterId";
    beforeEach(() => {
      stat = new Stat(encounterId);
      StatManager.RemoveStat.mockImplementation(() => true);
      StatManager.SaveStat.mockImplementation(() => true);
    });

    test("it returns true to hasEncounter", () => {
      expect(stat.hasEncounter).toBeTruthy();
    });

    test("it returns a blank Encounter", () => {
      expect(stat.encounter).toStrictEqual(<Encounter>{
        encounterId: encounterId,
        round: 1,
        overview: {
          start: "16 September 2022 07:23",
          end: "",
          gameDate: "16 September 2022 07:23",
          numberOfMonsters: 0,
          totalRounds: 1,
          scene: {
            name: "Dungeon One",
            thumb: "/images/test.webp",
          },
        },
        combatants: [],
        top: {
          maxDamage: "",
          mostDamageInOneTurn: "",
          highestAvgDamage: "",
          highestMaxDamage: "",
          mostKills: "",
          mostHealing: "",
          mostSupportActions: "",
          mostBattlefieldActions: ",",
        },
        templateHealthCheck: [],
      });
    });

    test("it calls RemoveStat", () => {
      stat.Delete();
      expect(StatManager.RemoveStat).toBeCalled();
    });

    test("it calls SaveStat", () => {
      stat.Save();
      expect(StatManager.SaveStat).toBeCalled();
    });

    test("it Updates the Round correctly", () => {
      expect(stat.currentRound).toBe(1);
      stat.UpdateRound(2);
      expect(stat.currentRound).toBe(2);
      stat.UpdateRound(2);
      expect(stat.currentRound).toBe(2);
      stat.UpdateRound(1);
      expect(stat.currentRound).toBe(1);
    });

    describe("Does its parsing work correctly", () => {
      test("it returns true to correct IsValidRollEvent", () => {
        expect(stat.IsValidRollEvent("mwak")).toBeTruthy();
      });
      test("it returns false to correct IsValidRollEvent", () => {
        expect(stat.IsValidRollEvent("mwaks")).toBeFalsy();
      });

      test("it returns true to correct IsValidAttack", () => {
        expect(stat.IsValidAttack("mwak")).toBeTruthy();
      });
      test("it returns false to correct IsValidAttack", () => {
        expect(stat.IsValidAttack("heal")).toBeFalsy();
      });

      test("it returns true to correct IsHealingSpell", () => {
        expect(stat.IsHealingSpell("heal")).toBeTruthy();
      });
      test("it returns false to correct IsHealingSpell", () => {
        expect(stat.IsHealingSpell("mwak")).toBeFalsy();
      });

      test("it returns true to correct IsValidCombatant", () => {
        expect(Stat.IsValidCombatant("character")).toBeTruthy();
      });
      test("it returns false to correct IsValidCombatant", () => {
        expect(Stat.IsValidCombatant("npc")).toBeFalsy();
      });
    });
  });

  describe("If it pulls from the combat flag", () => {
    let stat: Stat;
    beforeAll(async () => {
      stat = new Stat();
      StatManager.GetStat.mockResolvedValue(encounter);
      stat.encounter = await StatManager.GetStat();
    });

    test("it returns true to hasEncounter", () => {
      expect(stat.hasEncounter).toBeTruthy();
    });

    test("it returns a Encounter type", () => {
      expect(stat.encounter.encounterId).toBe("t98gppsau45ypm3t");
    });
  });

  describe("If you add a new combatant", () => {
    let stat: Stat;
    const encounterId = "encounterId";
    beforeEach(() => {
      (global as any).canvas = {
        tokens: {
          get: jest.fn().mockReturnValue({
            img: "testImageUrl",
          }),
        },
      };
      stat = new Stat(encounterId);
    });

    test("it shows the Encounter has one combatant", () => {
      stat.AddCombatant(actor, "tokenId", null);
      expect(stat.encounter.combatants.length).toBe(1);
    });

    test("you can get the combatant by actor id", () => {
      stat.AddCombatant(actor, "tokenId", null);
      expect(stat.encounter.combatants.length).toBe(1);
      expect(stat.GetCombatantStats("eMyoELkOwFNPGEK8")?.id).toBe(
        "eMyoELkOwFNPGEK8"
      );
    });

    test("you can get the combatant by actor id", () => {
      stat.AddCombatant(actor, "tokenId", null);
      expect(stat.encounter.combatants.length).toBe(1);
      expect(stat.GetCombatantStatsByTokenId("tokenId")?.id).toBe(
        "eMyoELkOwFNPGEK8"
      );
    });
  });

  describe("If you use the helper functions", () => {
    let stat: Stat;
    const encounterId = "encounterId";
    beforeEach(() => {
      (global as any).canvas = {
        tokens: {
          get: jest.fn().mockReturnValue({
            img: "testImageUrl",
          }),
        },
      };
      stat = new Stat(encounterId);
    });

    describe("If you add a new Kill", () => {
      test("you can see the kill added", () => {
        stat.AddCombatant(actor, "tokenId", null);
        stat.AddKill("Acolyte", "tokenId");
        stat.Save();
        expect(stat.encounter.combatants.length).toBe(1);
        expect(stat.GetCombatantStats("eMyoELkOwFNPGEK8")?.kills.length).toBe(
          1
        );
      });

      test("you can see a Log message if not valid", () => {
        stat.AddCombatant(actor, "tokenId", null);
        stat.AddKill("Acolyte", "tokenIdError");
        stat.Save();
        expect(mockLoggerWarn).toBeCalled();
        expect(stat.encounter.combatants.length).toBe(1);
        expect(stat.GetCombatantStats("eMyoELkOwFNPGEK8")?.kills.length).toBe(
          0
        );
      });
    });

    describe("If you update Health", () => {
      test("you can see healing done", () => {
        stat.AddCombatant(actor, "tokenId", null);
        stat.UpdateHealth({
          id: "eMyoELkOwFNPGEK8",
          system: {
            attributes: {
              hp: {
                value: 60,
                max: 100,
              },
            },
          },
        });
        stat.UpdateHealth({
          id: "eMyoELkOwFNPGEK8",
          system: {
            attributes: {
              hp: {
                value: 40,
                max: 100,
              },
            },
          },
        });
        stat.UpdateHealth({
          id: "eMyoELkOwFNPGEK8",
          system: {
            attributes: {
              hp: {
                value: 50,
                max: 100,
              },
            },
          },
        });
        stat.Save();
        expect(stat.encounter.combatants.length).toBe(1);
        const combatantResult = stat.GetCombatantStats("eMyoELkOwFNPGEK8");
        expect(combatantResult?.health.length).toBe(3);
        expect(combatantResult?.health[0].current).toBe(60);
        expect(combatantResult?.health[0].previous).toBe(80);
      });

      test("you can a log message when no actor passes", () => {
        stat.AddCombatant(actor, "tokenId", null);
        stat.UpdateHealth({
          system: {
            attributes: {
              hp: {
                value: 60,
                max: 100,
              },
            },
          },
        });
        stat.Save();
        expect(mockLoggerWarn).toBeCalled();
        expect(stat.encounter.combatants.length).toBe(1);
        const combatantResult = stat.GetCombatantStats("eMyoELkOwFNPGEK8");
        expect(combatantResult?.health.length).toBe(0);
      });
    });

    test("you can a log message when no actor can be found", () => {
      stat.AddCombatant(actor, "tokenId", null);
      stat.UpdateHealth({
        id: "eMyoELkOwFNPGEK9",
        system: {
          attributes: {
            hp: {
              value: 60,
              max: 100,
            },
          },
        },
      });
      stat.Save();
      expect(mockLoggerWarn).toBeCalled();
      expect(stat.encounter.combatants.length).toBe(1);
      const combatantResult = stat.GetCombatantStats("eMyoELkOwFNPGEK8");
      expect(combatantResult?.health.length).toBe(0);
    });

    test("do not add the same actor twice", () => {
      stat.AddCombatant(actor, "tokenId", null);
      stat.AddCombatant(actor, "tokenId", null);

      expect(stat.encounter.combatants.length).toBe(1);
    });

    test("you can a log message when errored actor is passed", () => {
      stat.AddCombatant({}, "tokenId", null);
      expect(mockLoggerWarn).toBeCalledWith(
        "No valid actor passed [object Object]",
        "stat.AddCombatant",
        {}
      );
    });

    describe("you can a log message when errored actor is passed", () => {
      beforeEach(() => {
        (global as any).canvas = {
          tokens: {
            get: jest.fn().mockReturnValue({
              img: undefined,
            }),
          },
        };
      });
      test("you can a log message when errored actor is passed", () => {
        stat.AddCombatant(actor, "tokenIdError", null);
        expect(mockLoggerWarn).toBeCalledWith(
          "No tokenImage for TokenID tokenIdError",
          "stat.AddCombatant",
          "tokenIdError"
        );
      });
    });

    test("initiative gets updated correctly", async () => {
      stat.AddCombatant(actor, "tokenId", null);
      expect(stat.encounter.combatants.length).toBe(1);
      expect(stat.encounter.combatants[0].initiative).toBeNull();
      stat.AddCombatant(actor, "tokenId", 19);
      expect(stat.encounter.combatants[0].initiative).toBe(19);
    });

    test("initiative order is correct", async () => {
      stat.AddCombatant(actor, "tokenId", null);
      stat.AddCombatant(actorTwo, "tokenId", null);
      stat.AddCombatant(actorThree, "tokenId", null);
      expect(stat.encounter.combatants.length).toBe(3);
      expect(stat.encounter.combatants[0].initiative).toBeNull();
      stat.AddCombatant(actor, "tokenId", 9);
      stat.AddCombatant(actorTwo, "tokenId", 18);
      stat.AddCombatant(actorThree, "tokenId", 21);
      expect(stat.encounter.combatants[0].initiative).toBe(21);
      expect(stat.encounter.combatants[1].initiative).toBe(18);
      expect(stat.encounter.combatants[2].initiative).toBe(9);
    });

    test("you return if the actor is not a character", () => {
      const newActor = actor;
      newActor.type = "npc";
      stat.AddCombatant(newActor, "tokenId", null);

      expect(stat.encounter.combatants.length).toBe(0);
    });
  });
});
