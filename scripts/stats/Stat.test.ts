import Stat from "./Stat";
import Logger from "../Helpers/Logger";
jest.mock("../StatManager");
import StatManager from "../StatManager";
import { actor, actorTwo, actorThree } from "../mockdata/actors";
import { combatantStats } from "../mockdata/combatantStats";
import { combatantStatsSingleCharacter } from "../mockdata/combatantStatsSingleCharacter";
import { combatantStatsBlank } from "../mockdata/combatantStatsBlank";

const mockLoggerLog = jest.fn();
const mockLoggerWarn = jest.fn();
Logger.log = mockLoggerLog;
Logger.warn = mockLoggerWarn;

beforeEach(() => {
  mockLoggerWarn.mockClear();
  mockLoggerLog.mockClear();
  jest.useFakeTimers().setSystemTime(new Date("01 January 2020"));
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

describe("Stat", () => {
  describe("If you get the correct party stats", () => {
    test("it returns the correct values", () => {
      const encounterId = "encounterId";
      const stat = new Stat(encounterId);
      const result = stat._partySummary(combatantStats);
      expect(result).toStrictEqual({
        averageDamagePerRound: 10,
        lowestDamagePerRound: 4,
        highestDamagePerRound: 16,
        totalDamage: 20,
        totalDamagePerRound: [
          {
            damageTotal: 4,
            round: 1,
          },
          {
            damageTotal: 16,
            round: 2,
          },
        ],
      });
    });
    test("it returns the correct values with one character", () => {
      const encounterId = "encounterId";
      const stat = new Stat(encounterId);
      const result = stat._partySummary(combatantStatsSingleCharacter);
      expect(result).toStrictEqual({
        averageDamagePerRound: 5,
        lowestDamagePerRound: 2,
        highestDamagePerRound: 8,
        totalDamage: 10,
        totalDamagePerRound: [
          {
            damageTotal: 2,
            round: 1,
          },
          {
            damageTotal: 8,
            round: 2,
          },
        ],
      });
    });
    test("it returns the correct values if empty combat", () => {
      const encounterId = "encounterId";
      const stat = new Stat(encounterId);
      const result = stat._partySummary(combatantStatsBlank);
      expect(result).toBeUndefined();
      expect(stat._encounter.partySummary).toStrictEqual({
        averageDamagePerRound: 0,
        lowestDamagePerRound: 0,
        highestDamagePerRound: 0,
        totalDamage: 0,
        totalDamagePerRound: [],
      });
    });
  });

  describe("If it is a new encounter", () => {
    let stat: Stat;
    const encounterId = "encounterId";
    beforeEach(() => {
      stat = new Stat(encounterId);
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
          start: "01 January 2020 00:00",
          end: "",
          realDate: "01 January 2020 00:00",
          scene: {
            id: "",
            name: "",
            thumb: "",
          },
        },
        enemies: [],
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
        partySummary: {
          averageDamagePerRound: 0,
          highestDamagePerRound: 0,
          lowestDamagePerRound: 0,
          totalDamage: 0,
          totalDamagePerRound: [],
        },
      });
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

    test("it shows the abilities of the combatant", async () => {
      await stat.AddCombatant(actor, "tokenId", null);
      expect(stat.encounter.combatants[0].abilities.cha).toBe(19);
    });

    test("it shows the Encounter has one combatant", async () => {
      await stat.AddCombatant(actor, "tokenId", null);
      expect(stat.encounter.combatants.length).toBe(1);
    });

    test("you can get the combatant by actor id", async () => {
      await stat.AddCombatant(actor, "tokenId", null);
      expect(stat.encounter.combatants.length).toBe(1);
      expect(stat.GetCombatantStats("eMyoELkOwFNPGEK8")?.id).toBe(
        "eMyoELkOwFNPGEK8"
      );
    });

    test("you can get the combatant by actor id", async () => {
      await stat.AddCombatant(actor, "tokenId", null);
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
      test("you can see the kill added", async () => {
        await stat.AddCombatant(actor, "tokenId", null);
        stat.AddKill("Acolyte", "tokenId");
        stat.Save();
        expect(stat.encounter.combatants.length).toBe(1);
        expect(stat.GetCombatantStats("eMyoELkOwFNPGEK8")?.kills.length).toBe(
          1
        );
      });

      test("you can see a Log message if not valid", async () => {
        await stat.AddCombatant(actor, "tokenId", null);
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
      test("you can see healing done", async () => {
        await stat.AddCombatant(actor, "tokenId", null);
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

      test("you can a log message when no actor passes", async () => {
        await stat.AddCombatant(actor, "tokenId", null);
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

    test("you can a log message when no actor can be found", async () => {
      await stat.AddCombatant(actor, "tokenId", null);
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

    test("do not add the same actor twice", async () => {
      await stat.AddCombatant(actor, "tokenId", null);
      await stat.AddCombatant(actor, "tokenId", null);

      expect(stat.encounter.combatants.length).toBe(1);
    });

    test("you can a log message when errored actor is passed", async () => {
      await stat.AddCombatant({}, "tokenId", null);
      expect(mockLoggerWarn).toBeCalledWith(
        "No valid actor passed [object Object]",
        "stat.AddCombatant",
        {}
      );
    });

    test("initiative gets updated correctly", async () => {
      await stat.AddCombatant(actor, "tokenId", null);
      expect(stat.encounter.combatants.length).toBe(1);
      expect(stat.encounter.combatants[0].initiative).toBeNull();
      await stat.AddCombatant(actor, "tokenId", 19);
      expect(stat.encounter.combatants[0].initiative).toBe(19);
    });

    test("initiative order is correct", async () => {
      await stat.AddCombatant(actor, "tokenId", null);
      await stat.AddCombatant(actorTwo, "tokenId", null);
      await stat.AddCombatant(actorThree, "tokenId", null);
      expect(stat.encounter.combatants.length).toBe(3);
      expect(stat.encounter.combatants[0].initiative).toBeNull();
      await stat.AddCombatant(actor, "tokenId", 9);
      await stat.AddCombatant(actorTwo, "tokenId", 18);
      await stat.AddCombatant(actorThree, "tokenId", 21);
      expect(stat.encounter.combatants[0].initiative).toBe(21);
      expect(stat.encounter.combatants[1].initiative).toBe(18);
      expect(stat.encounter.combatants[2].initiative).toBe(9);
    });

    test("you return if the actor is not a character", async () => {
      const newActor = actor;
      newActor.type = "npc";
      await stat.AddCombatant(newActor, "tokenId", null);

      expect(stat.encounter.combatants.length).toBe(0);
    });
  });
});
