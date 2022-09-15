import StatManager from "./StatManager";
import CombatFlag from "./CombatFlag";
import Logger from "./Helpers/Logger";
import EncounterJournal from "./EncounterJournal";
import Template from "./Template";

const mockCombatFlagIsSet = jest.fn();
const mockCombatFlagGet = jest.fn();
const mockCombatFlagSave = jest.fn();
CombatFlag.IsSet = mockCombatFlagIsSet;
CombatFlag.Get = mockCombatFlagGet;
CombatFlag.Save = mockCombatFlagSave;

const mockEncounterJournalUpdateJournalData = jest.fn();
EncounterJournal.UpdateJournalData = mockEncounterJournalUpdateJournalData;

const mockTemplateGenerate = jest.fn();
Template.Generate = mockTemplateGenerate;

const mockLoggerError = jest.fn();
Logger.error = mockLoggerError;

beforeEach(() => {
  mockCombatFlagIsSet.mockClear();
  mockCombatFlagGet.mockClear();
  mockCombatFlagSave.mockClear();
  mockEncounterJournalUpdateJournalData.mockClear();
  mockLoggerError.mockClear();
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
      mockTemplateGenerate.mockReturnValueOnce("<p>test</p>");
      await StatManager.SaveStat({ encounterId: "encounterId" });
      expect(mockCombatFlagSave).toBeCalledWith(
        "encounter-stats-data",
        { encounterId: "encounterId" }
      );
      expect(mockTemplateGenerate).toBeCalledWith(
        { encounterId: "encounterId" }
      );
      expect(mockEncounterJournalUpdateJournalData).toBeCalledWith(
        "<p>test</p>",
        "encounterId",
        "encounterId"
      );
    });
  });
});
