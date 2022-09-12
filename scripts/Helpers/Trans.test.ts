import Trans from "./Trans";

describe("Trans", () => {
  describe("if you try to get a translation", () => {
    beforeEach(() => {
      (global as any).game = {
        i18n: {
          format: jest.fn().mockReturnValue("TestKeyValue"),
        },
      };
    });

    test("it returns the correct translation string", () => {
      expect(Trans.Get("TestKey")).toBe("TestKeyValue");
    });
  });
});
