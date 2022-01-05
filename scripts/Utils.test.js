import {
  IsValidAttack,
  IsHealingSpell,
  IsValidRollEvent,
  GetCombatantStats,
  nullChecks,
  CombatantStats,
  ChatType,
  GetItemData,
} from "./Utils.js";
import { ATTACKTYPES } from "./Settings.js";
import Collection from "./mocks/Collection.js";
import CompendiumCollection from "./mocks/CompendiumCollection.js";

const packs = new Collection();
let pack = new CompendiumCollection({
  documentName: "Item",
  label: "Items (SRD)",
  name: "items",
  package: "dnd5e",
  path: "./packs/items.db",
  private: false,
  system: "dnd5e",
});
packs.set("dnd5e.items", pack);

global.game = {
  actors: {
    get: jest.fn().mockReturnValue({
      items: [
        {
          id: "WWb4vAmh18sMAxfY",
          data: {
            name: "Flame Tongue Greatsword",
            data: { actionType: "mwak" },
          },
        },
      ],
    }),
  },
  packs: packs,
};

describe("GetItemData", () => {
  test("it has an itemId assigned", async () => {
    const attackData = {
      item: {
        name: null,
        itemLink: null,
      },
    };
    const result = await GetItemData(
      attackData,
      "abc123",
      null,
      "WWb4vAmh18sMAxfY"
    );
    expect(result).toStrictEqual({
      actionType: "mwak",
      item: {
        itemLink:
          "@Compendium[dnd5e.items.WWb4vAmh18sMAxfY]{Flame Tongue Greatsword}",
        name: "Flame Tongue Greatsword",
      },
    });
  });

  test("it has no itemId assigned", async () => {
    const attackData = {
      actionType: "mwak",
      item: {
        name: null,
        itemLink: null,
      },
    };
    const result = await GetItemData(
      attackData,
      "abc123",
      `<div data-item-id="WWb4vAmh18sMAxfY"></div>`
    );
    expect(result).toStrictEqual({
      actionType: "mwak",
      item: {
        itemLink:
          "@Compendium[dnd5e.items.WWb4vAmh18sMAxfY]{Flame Tongue Greatsword}",
        name: "Flame Tongue Greatsword",
      },
    });
  });
});

describe("ChatType", () => {
  test("it is an attack type INFO", async () => {
    const data = {
      data: {
        content: `<div data-item-id="abc123"></div>`,
      },
    };
    const result = await ChatType(data);
    expect(result).toBe(ATTACKTYPES.INFO);
  });
  test("it is an attack type ATTACK", async () => {
    const data = {
      _roll: {},
      data: {
        flags: {
          dnd5e: {
            roll: {
              type: "attack",
            },
          },
        },
      },
    };
    const result = await ChatType(data);
    expect(result).toBe(ATTACKTYPES.ATTACK);
  });
  test("it is an attack type DAMAGE", async () => {
    const data = {
      _roll: {},
      data: {
        flags: {
          dnd5e: {
            roll: {
              type: "damage",
            },
          },
        },
      },
    };
    const result = await ChatType(data);
    expect(result).toBe(ATTACKTYPES.DAMAGE);
  });
  test("it is an attack type DAMAGE_FORMULA", async () => {
    const data = {
      data: {
        flavor: "Other Formula",
      },
    };
    const result = await ChatType(data);
    expect(result).toBe(ATTACKTYPES.DAMAGE_FORMULA);
  });
  test("it is an attack type NONE", async () => {
    const data = {};
    const result = await ChatType(data);
    expect(result).toBe(ATTACKTYPES.NONE);
  });
});

describe("IsValidRollEvent", () => {
  describe("it is a valid attack", () => {
    test("if it is mwak", () => {
      const result = IsValidRollEvent("mwak");
      expect(result).toBeTruthy();
    });
    test("if it is rwak", () => {
      const result = IsValidRollEvent("rwak");
      expect(result).toBeTruthy();
    });
    test("if it is msak", () => {
      const result = IsValidRollEvent("msak");
      expect(result).toBeTruthy();
    });
    test("if it is rsak", () => {
      const result = IsValidRollEvent("rsak");
      expect(result).toBeTruthy();
    });
    test("if it is save", () => {
      const result = IsValidRollEvent("save");
      expect(result).toBeTruthy();
    });
    test("if it is heal", () => {
      const result = IsValidRollEvent("heal");
      expect(result).toBeTruthy();
    });
  });
  test("it is not a valid attack", () => {
    const result = IsValidRollEvent("mwaks");
    expect(result).toBeFalsy();
  });
  test("it is a null string", () => {
    const result = IsValidRollEvent(null);
    expect(result).toBeFalsy();
  });
});

describe("IsValidAttack", () => {
  describe("it is a valid attack", () => {
    test("if it is mwak", () => {
      const result = IsValidAttack("mwak");
      expect(result).toBeTruthy();
    });
    test("if it is rwak", () => {
      const result = IsValidAttack("rwak");
      expect(result).toBeTruthy();
    });
    test("if it is msak", () => {
      const result = IsValidAttack("msak");
      expect(result).toBeTruthy();
    });
    test("if it is rsak", () => {
      const result = IsValidAttack("rsak");
      expect(result).toBeTruthy();
    });
    test("if it is save", () => {
      const result = IsValidAttack("save");
      expect(result).toBeTruthy();
    });
  });
  test("it is not a valid attack", () => {
    const result = IsValidAttack("mwaks");
    expect(result).toBeFalsy();
  });
  test("it is a null string", () => {
    const result = IsValidAttack(null);
    expect(result).toBeFalsy();
  });
});

describe("IsHealingSpell", () => {
  describe("it is a healing spell", () => {
    const result = IsHealingSpell("heal");
    expect(result).toBeTruthy();
  });
  test("it is not a valid healing spell", () => {
    const result = IsHealingSpell("mwak");
    expect(result).toBeFalsy();
  });
  test("it is a null string", () => {
    const result = IsHealingSpell(null);
    expect(result).toBeFalsy();
  });
});

describe("GetCombatantStats", () => {
  const statWithNoCombatants = {
    combatants: [],
  };
  const statWithCombatants = {
    combatants: [
      {
        id: "abc123",
        name: "Druss Legend",
      },
      {
        id: "def456",
        name: "Chaos Warrior",
      },
    ],
  };
  test("it returns the single combatant", () => {
    const result = GetCombatantStats(statWithCombatants, "abc123");
    expect(result).toStrictEqual({
      id: "abc123",
      name: "Druss Legend",
    });
  });
  test("it returns undefined if none found", () => {
    const result = GetCombatantStats(statWithCombatants, "abc1234");
    expect(result).toBeUndefined();
  });
  test("it returns undefined if combatants is empty", () => {
    const result = GetCombatantStats(statWithNoCombatants, "abc1234");
    expect(result).toBeUndefined();
  });
  test("it returns undefined if combatants is null", () => {
    const result = GetCombatantStats({}, "abc1234");
    expect(result).toBeUndefined();
  });
});

describe("nullChecks", () => {
  const attackDataWithNulls = {
    attackTotal: null,
    damageTotal: null,
  };
  const attackDataWithUndefined = {
    attackTotal: undefined,
    damageTotal: undefined,
  };
  const attackData = {
    attackTotal: 33,
    damageTotal: 55,
  };
  test("it returns 0 on nulls", () => {
    const result = nullChecks(attackDataWithNulls);
    expect(result).toStrictEqual({
      attackTotal: 0,
      damageTotal: 0,
    });
  });
  test("it returns 0 on undefined", () => {
    const result = nullChecks(attackDataWithUndefined);
    expect(result).toStrictEqual({
      attackTotal: 0,
      damageTotal: 0,
    });
  });
  test("it returns original data when correct", () => {
    const result = nullChecks(attackData);
    expect(result).toStrictEqual(attackData);
  });
});

describe("CombatantStats", () => {
  const combatantStat = {
    events: [
      {
        actionType: "mwak",
        damageTotal: 10,
      },
      {
        actionType: "rsak",
        damageTotal: 5,
      },
      {
        actionType: "rwak",
        damageTotal: 23,
      },
      {
        actionType: "mwak",
        damageTotal: 32,
      },
      {
        actionType: "msak",
        damageTotal: 2,
      },
      {
        actionType: "heal",
        damageTotal: 2,
      },
    ],
    summaryList: {},
  };
  test("it returns the correct structure and values", async () => {
    const result = await CombatantStats(combatantStat);
    expect(result.summaryList).toStrictEqual({
      avg: 14,
      max: 32,
      min: 2,
      total: 72,
    });
  });
});
