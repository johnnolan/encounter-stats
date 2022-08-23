import CampaignStat from "./CampaignStat";
import EncounterJournal from "./EncounterJournal";

const mockEncounterJournalGetCampaignJournal = jest.fn();
EncounterJournal.GetCampaignJournal = mockEncounterJournalGetCampaignJournal;

const mockEncounterJournalUpdateCampaignDataJournal = jest.fn();
EncounterJournal.UpdateCampaignDataJournal =
  mockEncounterJournalUpdateCampaignDataJournal;

const mockEncounterJournalUpdateCampaignJournal = jest.fn();
EncounterJournal.UpdateCampaignJournal =
  mockEncounterJournalUpdateCampaignJournal;

beforeEach(() => {
  mockEncounterJournalGetCampaignJournal.mockClear();
  mockEncounterJournalUpdateCampaignDataJournal.mockClear();
  mockEncounterJournalUpdateCampaignJournal.mockClear();
});

describe("CampaignStat", () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date("2020-01-01"));
  });

  describe("If I add a new Kill", () => {
    beforeEach(() => {
      mockEncounterJournalGetCampaignJournal.mockReturnValue({
        kills: [],
        heals: [],
        nat20: [],
        nat1: [],
      });
      jest.spyOn(CampaignStat, "Save");
    });

    test("it adds the kill correctly", async () => {
      await CampaignStat.AddKill("Lorena Aldabra", "Acolyte");
      expect(mockEncounterJournalUpdateCampaignDataJournal).toBeCalled();
      expect(mockEncounterJournalUpdateCampaignDataJournal).toBeCalledWith(
        JSON.stringify({
          kills: [
            {
              id: "20200101",
              dateDisplay: "2020-01-01",
              data: [
                {
                  actorName: "Lorena Aldabra",
                  tokenName: "Acolyte",
                  date: "2020-01-01T00:00:00.000Z",
                },
              ],
            },
          ],
          heals: [],
          nat20: [],
          nat1: [],
        })
      );
    });
  });

  describe("If I add a new heal", () => {
    beforeEach(() => {
      mockEncounterJournalGetCampaignJournal.mockReturnValue({
        kills: [],
        heals: [],
        nat20: [],
        nat1: [],
      });
      jest.spyOn(CampaignStat, "Save");
    });

    test("it adds the heal correctly", async () => {
      await CampaignStat.AddHeal(
        "Lorena Aldabra",
        "@Item Link",
        "Heal Wounds",
        20
      );
      expect(mockEncounterJournalUpdateCampaignDataJournal).toBeCalled();
      expect(mockEncounterJournalUpdateCampaignDataJournal).toBeCalledWith(
        JSON.stringify({
          kills: [],
          heals: [
            {
              id: "20200101",
              dateDisplay: "2020-01-01",
              data: [
                {
                  actorName: "Lorena Aldabra",
                  itemLink: "@Item Link",
                  spellName: "Heal Wounds",
                  total: 20,
                  date: "2020-01-01T00:00:00.000Z",
                },
              ],
            },
          ],
          nat20: [],
          nat1: [],
        })
      );
    });
  });

  describe("If I add a new nat1", () => {
    beforeEach(() => {
      mockEncounterJournalGetCampaignJournal.mockReturnValue({
        kills: [],
        heals: [],
        nat20: [],
        nat1: [],
      });
      jest.spyOn(CampaignStat, "Save");
    });

    test("it adds the nat1 correctly", async () => {
      await CampaignStat.AddRole("nat1", "Lorena Aldabra", "Wisdom Check");
      expect(mockEncounterJournalUpdateCampaignDataJournal).toBeCalled();
      expect(mockEncounterJournalUpdateCampaignDataJournal).toBeCalledWith(
        JSON.stringify({
          kills: [],
          heals: [],
          nat20: [],
          nat1: [
            {
              id: "20200101",
              dateDisplay: "2020-01-01",
              data: [
                {
                  actorName: "Lorena Aldabra",
                  flavor: "Wisdom Check",
                  date: "2020-01-01T00:00:00.000Z",
                },
              ],
            },
          ],
        })
      );
    });
  });

  describe("If I add a new Nat20", () => {
    beforeEach(() => {
      mockEncounterJournalGetCampaignJournal.mockReturnValue({
        kills: [],
        heals: [],
        nat20: [],
        nat1: [],
      });
      jest.spyOn(CampaignStat, "Save");
    });

    test("it adds the Nat20 correctly", async () => {
      await CampaignStat.AddRole("nat20", "Lorena Aldabra", "Insight Check");
      expect(mockEncounterJournalUpdateCampaignDataJournal).toBeCalled();
      expect(mockEncounterJournalUpdateCampaignDataJournal).toBeCalledWith(
        JSON.stringify({
          kills: [],
          heals: [],
          nat20: [
            {
              id: "20200101",
              dateDisplay: "2020-01-01",
              data: [
                {
                  actorName: "Lorena Aldabra",
                  flavor: "Insight Check",
                  date: "2020-01-01T00:00:00.000Z",
                },
              ],
            },
          ],
          nat1: [],
        })
      );
    });
  });
});
