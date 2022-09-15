import CombatFlag from "./CombatFlag";
import Logger from "./Helpers/Logger";
import { combatOne } from "./mockdata/combatOne";
import { combatTwo } from "./mockdata/combatTwo";
import { STORAGE_NAME } from "./Settings";

const mockLoggerError = jest.fn();
Logger.error = mockLoggerError;

beforeEach(() => {
  mockLoggerError.mockClear();
});

const multiCombat = [combatOne, combatTwo];

describe("CombatFlag", () => {
  describe("IsSet", () => {
    describe("given a flag is set on the active combat", () => {
      beforeEach(() => {
        (global as any).game = {
          combats: [
            {
              active: true,
              getFlag: jest.fn().mockReturnValue({}),
            },
          ],
        };
      });
      test("it returns true", async () => {
        const result = await CombatFlag.IsSet(STORAGE_NAME);
        expect(result).toBeTruthy();
      });
    });

    describe("given no flag is set on the active combat", () => {
      beforeEach(() => {
        (global as any).game = {
          combats: [
            {
              active: true,
              getFlag: jest.fn().mockReturnValue(undefined),
            },
          ],
        };
      });
      test("it returns false", async () => {
        const result = await CombatFlag.IsSet(STORAGE_NAME);
        expect(result).toBeFalsy();
      });
    });

    describe("given there is no active combat", () => {
      beforeEach(() => {
        (global as any).game = {
          combats: [],
        };
      });
      test("it returns false", async () => {
        const result = await CombatFlag.IsSet(STORAGE_NAME);
        expect(result).toBeFalsy();
      });
    });

    describe("given there is no active combat but combat is set", () => {
      beforeEach(() => {
        (global as any).game = {
          combats: [
            {
              active: false,
              getFlag: jest.fn().mockReturnValue({}),
            },
          ],
        };
      });
      test("it returns false", async () => {
        const result = await CombatFlag.IsSet(STORAGE_NAME);
        expect(result).toBeFalsy();
      });
    });
  });

  describe("Save", () => {
    describe("given there are two combats", () => {
      let cb1 = combatOne;
      let cb2 = combatTwo;
      let cb3: Encounter = combatTwo;
      beforeEach(() => {
        cb3.round = 2;
        (global as any).game = {
          combats: [
            {
              active: false,
              id: cb1.encounterId,
              getFlag: jest.fn().mockReturnValue(cb1),
              setFlag: jest.fn().mockResolvedValue(true),
            },
            {
              active: true,
              id: cb2.encounterId,
              getFlag: jest.fn().mockReturnValue(cb2),
              setFlag: jest.fn().mockResolvedValue(true),
            },
          ],
        };
      });
      test("it updates the correct combat by encounterId", async () => {
        await CombatFlag.Save(STORAGE_NAME, cb3);
        expect(cb2.round).toBe(2);
        expect(cb1.round).toBe(1);
      });
    });
  });

  describe("Get", () => {
    describe("given there is no valid active combat", () => {
      beforeEach(() => {
        (global as any).game = {
          combats: [
            {
              active: false,
              getFlag: jest.fn().mockReturnValue({}),
            },
          ],
        };
      });
      test("it returns undefined", async () => {
        const result = await CombatFlag.Get(STORAGE_NAME);
        expect(result).toBeUndefined();
      });
    });

    describe("given there is an active combat", () => {
      describe("given no actor id is passed", () => {
        beforeEach(() => {
          (global as any).game = {
            combats: [
              {
                active: true,
                getFlag: jest.fn().mockReturnValue(combatOne),
              },
              {
                active: false,
                getFlag: jest.fn().mockReturnValue(combatTwo),
              },
            ],
          };
        });
        test("it returns the correct combat", async () => {
          const result = await CombatFlag.Get(STORAGE_NAME);
          expect(result).toStrictEqual(combatOne);
          expect(result).not.toStrictEqual(combatTwo);
        });
      });

      describe("given an actor id is passed", () => {
        describe("and the actor is in the active combat", () => {
          beforeEach(() => {
            (global as any).game = {
              combats: [
                {
                  active: true,
                  getFlag: jest.fn().mockReturnValue(combatOne),
                },
                {
                  active: false,
                  getFlag: jest.fn().mockReturnValue(combatTwo),
                },
              ],
            };
          });
          test("it returns the correct combat with ", async () => {
            const result = await CombatFlag.Get(
              STORAGE_NAME,
              "5H4YnyD6zf9vcJ3a"
            );
            expect(result).toStrictEqual(combatOne);
            expect(result).not.toStrictEqual(combatTwo);
          });
        });

        describe("and the actor is not in the active combat", () => {
          beforeEach(() => {
            (global as any).game = {
              combats: [
                {
                  active: true,
                  getFlag: jest.fn().mockReturnValue(combatOne),
                },
                {
                  active: false,
                  getFlag: jest.fn().mockReturnValue(combatTwo),
                },
              ],
            };
          });
          test("it returns the correct combat with ", async () => {
            const result = await CombatFlag.Get(
              STORAGE_NAME,
              "5H4YnyD6zf9vcJ3P"
            );
            expect(result).toStrictEqual(combatTwo);
            expect(result).not.toStrictEqual(combatOne);
          });
        });

        describe("and the actor is not in any combat", () => {
          beforeEach(() => {
            (global as any).game = {
              combats: [
                {
                  active: true,
                  getFlag: jest.fn().mockReturnValue(combatOne),
                },
                {
                  active: false,
                  getFlag: jest.fn().mockReturnValue(combatTwo),
                },
              ],
            };
          });
          test("it returns the correct combat with ", async () => {
            const result = await CombatFlag.Get(
              STORAGE_NAME,
              "5H4YnyD6zf9vcJ3S"
            );
            expect(result).not.toStrictEqual(combatTwo);
            expect(result).not.toStrictEqual(combatOne);
            expect(result).toBeUndefined();
          });
        });
      });
    });
  });
});
