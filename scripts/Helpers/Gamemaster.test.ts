import CampaignStat from "../CampaignStat";
import Gamemaster from "./Gamemaster";

const mockSetFlag = jest.fn();
const mockGetFlag = jest.fn();
const mockCampaignStatSave = jest.fn();
CampaignStat.Save = mockCampaignStatSave;

beforeEach(() => {
  mockSetFlag.mockClear();
  mockGetFlag.mockClear();
  mockCampaignStatSave.mockClear();
});

describe("Gamemaster", () => {
  describe("GetActor", () => {
    describe("given there is a Gamemaster present", () => {
      beforeEach(() => {
        (global as any).game = {
          users: [
            {
              name: "Gamemaster",
              isGM: true,
            },
            {
              name: "Lorena Aldabra",
              isGM: false,
            },
          ],
        };
      });
      test("it returns the correct user", async () => {
        const result = Gamemaster.GetActor;
        expect(result.name).toBe("Gamemaster");
      });
    });

    describe("given there is no Gamemaster present", () => {
      beforeEach(() => {
        (global as any).game = {
          users: [
            {
              name: "Gamemaster",
              isGM: false,
            },
            {
              name: "Lorena Aldabra",
              isGM: false,
            },
          ],
        };
      });
      test("it returns undefined", async () => {
        const result = Gamemaster.GetActor;
        expect(result).toBeUndefined();
      });
    });
  });

  describe("GetStats", () => {
    describe("given there is a Gamemaster present", () => {
      describe("and there is no flag set", () => {
        beforeEach(() => {
          (global as any).game = {
            users: [
              {
                name: "Gamemaster",
                isGM: true,
                flags: [],
                setFlag: mockSetFlag,
                getFlag: mockGetFlag.mockReturnValue(undefined),
              },
            ],
          };
        });
        test("it returns a new object", async () => {
          const result = Gamemaster.GetStats;
          expect(mockSetFlag).toBeCalled();
          expect(result).toStrictEqual({
            kills: [],
            nat1: [],
            nat20: [],
            heals: [],
            custom: [],
          });
        });
      });
      describe("and there is a flag set", () => {
        beforeEach(() => {
          (global as any).game = {
            users: [
              {
                name: "Gamemaster",
                isGM: true,
                flags: [],
                setFlag: mockSetFlag,
                getFlag: mockGetFlag.mockReturnValue({
                  kills: [{
                    id: "id",
                    dateDisplay: "dateDisplay",
                    data: "data",
                  }],
                  nat1: [],
                  nat20: [],
                  heals: [],
                  custom: [],
                }),
              },
            ],
          };
        });

        test("it returns the stored object", async () => {
          const result = Gamemaster.GetStats;
          expect(mockSetFlag).not.toBeCalled();
          expect(result).toStrictEqual({
            kills: [{
              id: "id",
              dateDisplay: "dateDisplay",
              data: "data",
            }],
            nat1: [],
            nat20: [],
            heals: [],
            custom: [],
          });
        });
      });
    });
  });

  describe("DeleteStats", () => {
    describe("given there is a Gamemaster present", () => {
      beforeEach(() => {
        (global as any).game = {
          users: [
            {
              name: "Gamemaster",
              isGM: true,
              flags: [],
                setFlag: mockSetFlag,
                getFlag: mockGetFlag.mockReturnValue({
                  kills: [{
                    id: "id",
                    dateDisplay: "dateDisplay",
                    data: "data",
                  }],
                  nat1: [],
                  nat20: [],
                  heals: [],
                  custom: [],
                }),
            },
          ],
        };
      });
      test("it deletes and resets the data", async () => {
        Gamemaster.DeleteStats();
        expect(mockCampaignStatSave).toBeCalledWith(Gamemaster.DEFAULT_DATA);
        expect(mockSetFlag).toBeCalledWith("encounter-stats", "campaign-stats", Gamemaster.DEFAULT_DATA);
      });
    });
  });
});
