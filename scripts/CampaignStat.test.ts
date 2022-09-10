import CampaignStat from "./CampaignStat";
import EncounterJournal from "./EncounterJournal";
import { RoleType } from "./enums";

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
    jest.useFakeTimers().setSystemTime(new Date("01 January 2020"));
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
      await CampaignStat.AddKill("Lorena Aldabra", "Ancient Red Dragon");
      expect(mockEncounterJournalUpdateCampaignDataJournal).toBeCalled();
      expect(mockEncounterJournalUpdateCampaignDataJournal).toBeCalledWith(
        JSON.stringify({
          kills: [
            {
              id: "20200101",
              dateDisplay: "01 January 2020",
              data: [
                {
                  actorName: "Lorena Aldabra",
                  tokenName: "Acolyte",
                  date: "01 January 2020 00:00",
                },
                {
                  actorName: "Lorena Aldabra",
                  tokenName: "Ancient Red Dragon",
                  date: "01 January 2020 00:00",
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
      await CampaignStat.AddHeal(
        "Lorena Aldabra",
        undefined,
        "Heal Wounds",
        10
      );
      expect(mockEncounterJournalUpdateCampaignDataJournal).toBeCalled();
      expect(mockEncounterJournalUpdateCampaignDataJournal).toBeCalledWith(
        JSON.stringify({
          kills: [],
          heals: [
            {
              id: "20200101",
              dateDisplay: "01 January 2020",
              data: [
                {
                  actorName: "Lorena Aldabra",
                  itemLink: "@Item Link",
                  spellName: "Heal Wounds",
                  total: 20,
                  date: "01 January 2020 00:00",
                },
                {
                  actorName: "Lorena Aldabra",
                  itemLink: undefined,
                  spellName: "Heal Wounds",
                  total: 10,
                  date: "01 January 2020 00:00",
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

  describe("If I add a new fumble", () => {
    beforeEach(() => {
      mockEncounterJournalGetCampaignJournal.mockReturnValue({
        kills: [],
        heals: [],
        nat20: [],
        nat1: [],
      });
      jest.spyOn(CampaignStat, "Save");
    });

    test("it adds the fumble correctly", async () => {
      await CampaignStat.AddRole(
        RoleType.Fumble,
        "Lorena Aldabra",
        "Wisdom Check"
      );
      await CampaignStat.AddRole(
        RoleType.Fumble,
        "Lorena Aldabra",
        "Wisdom Check"
      );
      expect(mockEncounterJournalUpdateCampaignDataJournal).toBeCalled();
      expect(mockEncounterJournalUpdateCampaignDataJournal).toBeCalledWith(
        JSON.stringify({
          kills: [],
          heals: [],
          nat20: [],
          nat1: [
            {
              id: "20200101",
              dateDisplay: "01 January 2020",
              data: [
                {
                  actorName: "Lorena Aldabra",
                  flavor: "Wisdom Check",
                  date: "01 January 2020 00:00",
                },
                {
                  actorName: "Lorena Aldabra",
                  flavor: "Wisdom Check",
                  date: "01 January 2020 00:00",
                },
              ],
            },
          ],
        })
      );
    });
  });

  describe("If I add a new critical", () => {
    beforeEach(() => {
      mockEncounterJournalGetCampaignJournal.mockReturnValue({
        kills: [],
        heals: [],
        nat20: [],
        nat1: [],
      });
      jest.spyOn(CampaignStat, "Save");
    });

    test("it adds the critical correctly", async () => {
      await CampaignStat.AddRole(
        RoleType.Critial,
        "Lorena Aldabra",
        "Insight Check"
      );
      await CampaignStat.AddRole(
        RoleType.Critial,
        "Lorena Aldabra",
        "Insight Check"
      );
      expect(mockEncounterJournalUpdateCampaignDataJournal).toBeCalled();
      expect(mockEncounterJournalUpdateCampaignDataJournal).toBeCalledWith(
        JSON.stringify({
          kills: [],
          heals: [],
          nat20: [
            {
              id: "20200101",
              dateDisplay: "01 January 2020",
              data: [
                {
                  actorName: "Lorena Aldabra",
                  flavor: "Insight Check",
                  date: "01 January 2020 00:00",
                },
                {
                  actorName: "Lorena Aldabra",
                  flavor: "Insight Check",
                  date: "01 January 2020 00:00",
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
