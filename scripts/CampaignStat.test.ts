import CampaignStat from "./CampaignStat";
import { RoleType } from "./enums";
import Gamemaster from "./Helpers/Gamemaster";

const mockGamemasterGetStats = jest.spyOn(Gamemaster, "GetStats", "get");
const mockGamemasterSetStats = jest.fn();
Gamemaster.SetStats = mockGamemasterSetStats;

beforeEach(() => {
  mockGamemasterGetStats.mockClear();
  mockGamemasterSetStats.mockClear();
});

describe("CampaignStat", () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date("01 January 2020"));
  });

  describe("If I add a new Kill", () => {
    beforeEach(() => {
      mockGamemasterGetStats.mockReturnValue({
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
      expect(mockGamemasterSetStats).toBeCalled();
      expect(mockGamemasterSetStats).toBeCalledWith({
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
      });
    });
  });

  describe("If I add a new heal", () => {
    beforeEach(() => {
      mockGamemasterGetStats.mockReturnValue({
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
      expect(mockGamemasterSetStats).toBeCalled();
      expect(mockGamemasterSetStats).toBeCalledWith({
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
      });
    });
  });

  describe("If I add a new fumble", () => {
    beforeEach(() => {
      mockGamemasterGetStats.mockReturnValue({
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
      expect(mockGamemasterSetStats).toBeCalled();
      expect(mockGamemasterSetStats).toBeCalledWith({
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
      });
    });
  });

  describe("If I add a new critical", () => {
    beforeEach(() => {
      mockGamemasterGetStats.mockReturnValue({
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
      expect(mockGamemasterSetStats).toBeCalled();
      expect(mockGamemasterSetStats).toBeCalledWith({
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
      });
    });
  });
});
