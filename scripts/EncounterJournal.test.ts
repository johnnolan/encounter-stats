import EncounterJournal from "./EncounterJournal";
import Logger from "./Helpers/Logger";

const mockLoggerError = jest.fn();
Logger.error = mockLoggerError;

beforeEach(() => {
  mockLoggerError.mockClear();
});

describe("EncounterJournal", () => {
  describe("IsJournalSetup", () => {
    describe("given it is not setup", () => {
      beforeEach(() => {
        (global as any).game = {
          journal: [
            {
              name: "unknown",
            },
          ],
        };
      });
      test("it returns false", async () => {
        const result = EncounterJournal.IsJournalSetup;
        expect(result).toBeFalsy();
      });
    });

    describe("given it is setup", () => {
      beforeEach(() => {
        (global as any).game = {
          journal: [
            {
              name: "Encounter Statistics",
            },
          ],
        };
      });
      test("it returns true", async () => {
        const result = EncounterJournal.IsJournalSetup;
        expect(result).toBeTruthy();
      });
    });
  });
});
