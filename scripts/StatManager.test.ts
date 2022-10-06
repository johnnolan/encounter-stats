import StatManager from "./StatManager";
import CombatFlag from "./CombatFlag";
import Logger from "./Helpers/Logger";
import EncounterJournal from "./EncounterJournal";
import EncounterRenderer from "./EncounterRenderer";

const mockCombatFlagIsCurrentSceneCombatSet = jest.fn();
const mockCombatFlagGet = jest.fn();
const mockCombatFlagSave = jest.fn();
CombatFlag.IsCurrentSceneCombatSet = mockCombatFlagIsCurrentSceneCombatSet;
CombatFlag.Get = mockCombatFlagGet;
CombatFlag.Save = mockCombatFlagSave;

const mockEncounterJournalUpdateJournalData = jest.fn();
EncounterJournal.UpdateJournalData = mockEncounterJournalUpdateJournalData;

const mockLoggerError = jest.fn();
Logger.error = mockLoggerError;

beforeEach(() => {
  mockCombatFlagIsCurrentSceneCombatSet.mockClear();
  mockCombatFlagGet.mockClear();
  mockCombatFlagSave.mockClear();
  mockEncounterJournalUpdateJournalData.mockClear();
  mockLoggerError.mockClear();
  (global as any).game = {
    i18n: {
      format: jest.fn().mockReturnValue("TestKeyValue"),
    },
  };
  (global as any).renderTemplate = jest.fn().mockResolvedValue("<html></html>");
});

describe("StatManager", () => {
  describe("IsInCombat", () => {
    test("it returns false if game combat is false and deletes local storage if present", async () => {
      (global as any).game = {
        combat: {
          active: false,
        },
      };
      mockCombatFlagIsCurrentSceneCombatSet.mockReturnValueOnce(false);
      const isInCombat = StatManager.IsInCombat();
      expect(mockCombatFlagIsCurrentSceneCombatSet).toBeCalledWith(
        "encounter-stats-data"
      );
      expect(isInCombat).toBeFalsy();
    });

    test("it returns false if local storage is not set", async () => {
      (global as any).game = {
        combat: {
          active: false,
        },
      };
      mockCombatFlagIsCurrentSceneCombatSet.mockReturnValueOnce(false);
      const isInCombat = StatManager.IsInCombat();
      expect(mockCombatFlagIsCurrentSceneCombatSet).toBeCalledWith(
        "encounter-stats-data"
      );
      expect(isInCombat).toBeFalsy();
    });

    test("it returns true if local storage is set", async () => {
      (global as any).game = {
        combat: {
          active: true,
        },
      };
      mockCombatFlagIsCurrentSceneCombatSet.mockReturnValueOnce(true);
      const isInCombat = StatManager.IsInCombat();
      expect(mockCombatFlagIsCurrentSceneCombatSet).toBeCalledWith(
        "encounter-stats-data"
      );
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
      const mockEncounterRendererRenderEncounter = jest
        .fn()
        .mockResolvedValueOnce({ html: "<p>test</p>" });
      EncounterRenderer.Render = mockEncounterRendererRenderEncounter;
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
});
