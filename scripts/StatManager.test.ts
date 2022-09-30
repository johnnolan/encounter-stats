import StatManager from "./StatManager";
import CombatFlag from "./CombatFlag";
import Logger from "./Helpers/Logger";
import EncounterJournal from "./EncounterJournal";
import { combatantStats } from "./mockdata/combatantStats";

const mockCombatFlagIsSet = jest.fn();
const mockCombatFlagGet = jest.fn();
const mockCombatFlagSave = jest.fn();
CombatFlag.IsSet = mockCombatFlagIsSet;
CombatFlag.Get = mockCombatFlagGet;
CombatFlag.Save = mockCombatFlagSave;

const mockEncounterJournalUpdateJournalData = jest.fn();
EncounterJournal.UpdateJournalData = mockEncounterJournalUpdateJournalData;

const mockLoggerError = jest.fn();
Logger.error = mockLoggerError;

beforeEach(() => {
  mockCombatFlagIsSet.mockClear();
  mockCombatFlagGet.mockClear();
  mockCombatFlagSave.mockClear();
  mockEncounterJournalUpdateJournalData.mockClear();
  mockLoggerError.mockClear();
  (global as any).game = {
    i18n: {
      format: jest.fn().mockReturnValue("TestKeyValue"),
    },
  };
});

describe("StatManager", () => {
  describe("IsInCombat", () => {
    test("it returns false if game combat is false and deletes local storage if present", async () => {
      (global as any).game = {
        combat: {
          active: false,
        },
      };
      mockCombatFlagIsSet.mockReturnValueOnce(true);
      const isInCombat = await StatManager.IsInCombat();
      expect(mockCombatFlagIsSet).toBeCalledWith("encounter-stats-data");
      expect(isInCombat).toBeFalsy();
    });

    test("it returns false if local storage is not set", async () => {
      (global as any).game = {
        combat: {
          active: false,
        },
      };
      mockCombatFlagIsSet.mockReturnValueOnce(false);
      const isInCombat = await StatManager.IsInCombat();
      expect(mockCombatFlagIsSet).toBeCalledWith("encounter-stats-data");
      expect(isInCombat).toBeFalsy();
    });

    test("it returns true if local storage is set", async () => {
      (global as any).game = {
        combat: {
          active: true,
        },
      };
      mockCombatFlagIsSet.mockReturnValueOnce(true);
      const isInCombat = await StatManager.IsInCombat();
      expect(mockCombatFlagIsSet).toBeCalledWith("encounter-stats-data");
      expect(isInCombat).toBeTruthy();
    });
  });

  describe("GetStat", () => {
    test("it returns value from local storage", async () => {
      mockCombatFlagGet.mockReturnValueOnce({
        encounterId: "1",
      });
      const result = await StatManager.GetStat();
      expect(mockCombatFlagGet).toBeCalledWith(
        "encounter-stats-data",
        undefined
      );
      expect(result).toStrictEqual({ encounterId: "1" });
    });
  });

  describe("SaveStat", () => {
    test("it returns throwing an error with no encounterId", async () => {
      await StatManager.SaveStat({});
      expect(mockLoggerError).toBeCalledWith(
        "No encounterId to save stat",
        "statmanager.SaveStat"
      );
    });

    test("it generates the journal entry and saves the json data", async () => {
      await StatManager.SaveStat({ encounterId: "encounterId" });
      expect(mockCombatFlagSave).toBeCalledWith("encounter-stats-data", {
        encounterId: "encounterId",
      });
      expect(mockEncounterJournalUpdateJournalData).toBeCalledWith(
        "<p>test</p>",
        "encounterId",
        "encounterId"
      );
    });
  });

  describe("RenderEncounter", () => {
    test("it generates the journal entry and saves the json data", async () => {
      const result = await StatManager.RenderEncounter(combatantStats);

      expect(result.overview.scene).toStrictEqual(
        combatantStats.overview.scene
      );
      expect(result.enemies).toStrictEqual(combatantStats.enemies);

      expect(result.enemyNumber).toBe(1);

      expect(result.overview.start).toBe("16 September 2022 07:23");
      expect(result.overview.end).toBe("16 September 2022 08:56");
      expect(result.combatants.length).toBe(1);

      const combatant = result.combatants[0];
      expect(combatant.name).toBe("Lorena Aldabra");
      expect(combatant.id).toBe("5H4YnyD6zf9vcJ3P");
      expect(combatant.tokenId).toBe("hoTFHXIbChPmVzQq");
      expect(combatant.img).toBe(
        "tokens/pcs/lorena/lorena_topdown_resting.png"
      );
      expect(combatant.type).toBe("character");
      expect(combatant.abilities).toStrictEqual(
        combatantStats.combatants[0].abilities
      );

      expect(combatant.rounds.length).toBe(2);
      expect(combatant.rounds[0].round).toBe(1);
      expect(combatant.rounds[1].round).toBe(2);

      expect(combatant.rounds[0].attacks.length).toBe(2);
      expect(combatant.rounds[1].attacks.length).toBe(1);

      expect(combatant.rounds[0].attacks[0].item.img).toBe(
        "/img/greatsword.webp"
      );
      expect(combatant.rounds[0].attacks[0].item.name).toBe(
        "Flame Tongue Greatsword"
      );
      expect(combatant.rounds[0].attacks[0].item.itemLink).toBe(
        "@Compendium[dnd5e.items.WWb4vAmh18sMAxfY]{Flame Tongue Greatsword}"
      );
      expect(combatant.rounds[0].attacks[0].damageOrHeal).toBe("red");
      expect(combatant.rounds[0].attacks[0].rollAdvDis).toBe("normal");
      expect(combatant.rounds[0].attacks[0].damageTotal).toBe(12);
      expect(combatant.rounds[0].attacks[0].damageMultipleEnemiesTotal).toBe(
        12
      );
      expect(combatant.rounds[0].attacks[0].actionTypeIcon).toBe(
        '<i title="TestKeyValue" class="fas fa-fist-raised"></i>'
      );

      expect(combatant.rounds[0].kills.length).toBe(1);
      expect(combatant.rounds[1].kills.length).toBe(1);

      expect(combatant.rounds[0].health.length).toBe(1);
      expect(combatant.rounds[0].health[0].current).toBe(24);
      expect(combatant.rounds[0].health[0].diff).toBe("+ 14");
      expect(combatant.rounds[1].health.length).toBe(1);

      expect(combatant.rounds[0].damageTotal).toBe(2);
      expect(combatant.rounds[1].damageTotal).toBe(8);
    });
  });
});
