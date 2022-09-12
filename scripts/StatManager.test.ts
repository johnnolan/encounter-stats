import StatManager from "./StatManager";
import LocalStorage from "./LocalStorage";
import Logger from "./Helpers/Logger";
import EncounterJournal from "./EncounterJournal";
import Template from "./Template";

const mockLocalStorageIsSet = jest.fn();
const mockLocalStorageTruncateLocalStorage = jest.fn();
const mockLocalStorageGetItemFromLocalStorage = jest.fn();
const mockLocalStorageSaveToLocalStorageStat = jest.fn();
LocalStorage.IsSet = mockLocalStorageIsSet;
LocalStorage.TruncateLocalStorage = mockLocalStorageTruncateLocalStorage;
LocalStorage.GetItemFromLocalStorage = mockLocalStorageGetItemFromLocalStorage;
LocalStorage.SaveToLocalStorageStat = mockLocalStorageSaveToLocalStorageStat;

const mockEncounterJournalUpdateJournalData = jest.fn();
EncounterJournal.UpdateJournalData = mockEncounterJournalUpdateJournalData;

const mockTemplateGenerate = jest.fn();
Template.Generate = mockTemplateGenerate;

const mockLoggerError = jest.fn();
Logger.error = mockLoggerError;

beforeEach(() => {
  mockLocalStorageIsSet.mockClear();
  mockLocalStorageTruncateLocalStorage.mockClear();
  mockLocalStorageGetItemFromLocalStorage.mockClear();
  mockLocalStorageSaveToLocalStorageStat.mockClear();
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
      mockLocalStorageIsSet.mockReturnValueOnce(true);
      const isInCombat = StatManager.IsInCombat();
      expect(mockLocalStorageTruncateLocalStorage).toBeCalled();
      expect(mockLocalStorageIsSet).toBeCalledWith("encounter-stats-data");
      expect(isInCombat).toBeFalsy();
    });

    test("it returns false if local storage is not set", async () => {
      (global as any).game = {
        combat: {
          active: false,
        },
      };
      mockLocalStorageIsSet.mockReturnValueOnce(false);
      const isInCombat = StatManager.IsInCombat();
      expect(mockLocalStorageTruncateLocalStorage).not.toBeCalled();
      expect(mockLocalStorageIsSet).toBeCalledWith("encounter-stats-data");
      expect(isInCombat).toBeFalsy();
    });

    test("it returns true if local storage is set", async () => {
      (global as any).game = {
        combat: {
          active: true,
        },
      };
      mockLocalStorageIsSet.mockReturnValueOnce(true);
      const isInCombat = StatManager.IsInCombat();
      expect(mockLocalStorageTruncateLocalStorage).not.toBeCalled();
      expect(mockLocalStorageIsSet).toBeCalledWith("encounter-stats-data");
      expect(isInCombat).toBeTruthy();
    });
  });

  describe("GetStat", () => {
    test("it returns value from local storage", async () => {
      mockLocalStorageGetItemFromLocalStorage.mockReturnValueOnce({
        encounterId: "1",
      });
      const result = StatManager.GetStat();
      expect(mockLocalStorageGetItemFromLocalStorage).toBeCalledWith(
        "encounter-stats-data"
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
      expect(mockLocalStorageSaveToLocalStorageStat).toBeCalledWith(
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

  describe("RemoveStat", () => {
    test("it removes value from local storage", async () => {
      StatManager.RemoveStat();
      expect(mockLocalStorageTruncateLocalStorage).toBeCalled();
    });
  });
});
