import Logger from "./Logger";

const mockConsoleLog = jest.fn();
const mockConsoleDebug = jest.fn();
const mockConsoleWarn = jest.fn();
const mockConsoleError = jest.fn();

describe("Logger", () => {
  beforeEach(() => {
    (global as any).console = {
      log: mockConsoleLog,
      debug: mockConsoleDebug,
      warn: mockConsoleWarn,
      error: mockConsoleError,
    };
  });
  describe("log", () => {
    test("it calls console correctly", () => {
      Logger.log("Description", "module.name", {
        actor: { id: "actorId" },
      });
      expect(mockConsoleLog).toBeCalled();
      expect(mockConsoleLog).toBeCalledWith(
        "Encounter Stats",
        "module.name",
        "Description",
        { actor: { id: "actorId" } }
      );
    });

    test("it calls console correctly with default", () => {
      Logger.log("Description");
      expect(mockConsoleLog).toBeCalled();
      expect(mockConsoleLog).toBeCalledWith(
        "Encounter Stats",
        "global",
        "Description",
        {}
      );
    });
  });

  describe("debug", () => {
    test("it calls console correctly", () => {
      Logger.debug("Description", "module.name", {
        actor: { id: "actorId" },
      });
      expect(mockConsoleDebug).toBeCalled();
      expect(mockConsoleDebug).toBeCalledWith(
        "Encounter Stats",
        "module.name",
        "Description",
        { actor: { id: "actorId" } }
      );
    });

    test("it calls console correctly with default", () => {
      Logger.debug("Description");
      expect(mockConsoleDebug).toBeCalled();
      expect(mockConsoleDebug).toBeCalledWith(
        "Encounter Stats",
        "global",
        "Description",
        {}
      );
    });
  });

  describe("warn", () => {
    test("it calls console correctly", () => {
      Logger.warn("Description", "module.name", {
        actor: { id: "actorId" },
      });
      expect(mockConsoleWarn).toBeCalled();
      expect(mockConsoleWarn).toBeCalledWith(
        "Encounter Stats",
        "module.name",
        "Description",
        { actor: { id: "actorId" } }
      );
    });

    test("it calls console correctly with default", () => {
      Logger.warn("Description");
      expect(mockConsoleWarn).toBeCalled();
      expect(mockConsoleWarn).toBeCalledWith(
        "Encounter Stats",
        "global",
        "Description",
        {}
      );
    });
  });

  describe("error", () => {
    test("it calls console correctly", () => {
      Logger.error("Description", "module.name", {
        actor: { id: "actorId" },
      });
      expect(mockConsoleError).toBeCalled();
      expect(mockConsoleError).toBeCalledWith(
        "Encounter Stats",
        "module.name",
        "Description",
        { actor: { id: "actorId" } }
      );
    });

    test("it calls console correctly with default", () => {
      Logger.error("Description");
      expect(mockConsoleError).toBeCalled();
      expect(mockConsoleError).toBeCalledWith(
        "Encounter Stats",
        "global",
        "Description",
        {}
      );
    });
  });
});
