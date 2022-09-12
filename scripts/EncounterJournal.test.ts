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

  describe("IsCampaignJournalSetup", () => {
    describe("given it is not setup", () => {
      beforeEach(() => {
        (global as any).game = {
          journal: [
            {
              name: "Encounter Statistics",
              pages: [
                {
                  getFlag: jest.fn().mockReturnValue(undefined),
                },
              ],
            },
          ],
        };
      });
      test("it returns false", async () => {
        const result = EncounterJournal.IsCampaignJournalSetup;
        expect(result).toBeFalsy();
      });
    });

    describe("given it is setup", () => {
      beforeEach(() => {
        (global as any).game = {
          journal: [
            {
              name: "Encounter Statistics",
              pages: [
                {
                  getFlag: jest.fn().mockReturnValue("data"),
                },
              ],
            },
          ],
        };
      });
      test("it returns true", async () => {
        const result = EncounterJournal.IsCampaignJournalSetup;
        expect(result).toBeTruthy();
      });
    });
  });

  describe("IsCampaignJournalSetup", () => {
    describe("given it is not setup", () => {
      beforeEach(() => {
        (global as any).game = {
          journal: [
            {
              name: "Encounter Statistics",
              pages: [
                {
                  getFlag: jest.fn().mockReturnValue(undefined),
                },
              ],
            },
          ],
        };
      });
      test("it returns false", async () => {
        const result = EncounterJournal.IsCampaignJournalSetup;
        expect(result).toBeFalsy();
      });
    });
  });
});
