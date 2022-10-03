import EncounterRenderer from "./EncounterRenderer";
import { combatantStats } from "./mockdata/combatantStats";
import { combatantStatsEmptyEnemies } from "./mockdata/combatantStatsEmptyEnemies";
import { combatantStatsEmptyRound } from "./mockdata/combatantStatsEmptyRound";

beforeEach(() => {
  (global as any).game = {
    i18n: {
      format: jest.fn().mockReturnValue("TestKeyValue"),
    },
  };
  (global as any).renderTemplate = jest.fn().mockResolvedValue("<html></html>");
});

describe("EncounterRenderer", () => {

  describe("RenderEncounter", () => {
    test("it generates the journal entry and saves the json data", async () => {
      const resultFunction = await EncounterRenderer.Render(combatantStats);
      const result = resultFunction.data;

      expect(result.overview.scene).toStrictEqual(
        combatantStats.overview.scene
      );
      expect(result.enemies).toStrictEqual(combatantStats.enemies);

      expect(result.enemyNumber).toBe(1);

      expect(result.overview.start).toBe("16 September 2022 07:23");
      expect(result.overview.end).toBe("16 September 2022 08:56");
      expect(result.combatants.length).toBe(2);

      const combatant = result.combatants[0];
      expect(combatant.name).toBe("Lorena Aldabra");
      expect(combatant.id).toBe("5H4YnyD6zf9vcJ3P");
      expect(combatant.tokenId).toBe("hoTFHXIbChPmVzQq");
      expect(combatant.img).toBe(
        "tokens/pcs/lorena/lorena_topdown_resting.png"
      );
      expect(combatant.type).toBe("character");
      expect(combatant.abilities).toStrictEqual(
        combatantStats.combatants[0].abilities
      );

      expect(combatant.rounds.length).toBe(2);
      expect(combatant.rounds[0].round).toBe(1);
      expect(combatant.rounds[1].round).toBe(2);

      expect(combatant.rounds[0].attacks.length).toBe(2);
      expect(combatant.rounds[1].attacks.length).toBe(1);

      expect(combatant.rounds[0].attacks[0].item.img).toBe(
        "/img/greatsword.webp"
      );
      expect(combatant.rounds[0].attacks[0].item.name).toBe(
        "Flame Tongue Greatsword"
      );
      expect(combatant.rounds[0].attacks[0].item.itemLink).toBe(
        "@Compendium[dnd5e.items.WWb4vAmh18sMAxfY]{Flame Tongue Greatsword}"
      );
      expect(combatant.rounds[0].attacks[0].damageOrHeal).toBe("red");
      expect(combatant.rounds[0].attacks[0].rollAdvDis).toBe("normal");
      expect(combatant.rounds[0].attacks[0].damageTotal).toBe(12);
      expect(combatant.rounds[0].attacks[0].damageMultipleEnemiesTotal).toBe(
        12
      );
      expect(combatant.rounds[0].attacks[0].actionTypeIcon).toBe(
        '<i title="TestKeyValue" class="fas fa-fist-raised"></i>'
      );

      expect(combatant.rounds[0].kills.length).toBe(1);
      expect(combatant.rounds[1].kills.length).toBe(1);

      expect(combatant.rounds[0].health.length).toBe(1);
      expect(combatant.rounds[0].health[0].current).toBe(24);
      expect(combatant.rounds[0].health[0].diff).toBe("+ 14");
      expect(combatant.rounds[1].health.length).toBe(1);

      expect(combatant.rounds[0].damageTotal).toBe(2);
      expect(combatant.rounds[1].damageTotal).toBe(8);

      expect(combatant.downed).toBe(0);

      const combatant2 = result.combatants[1];
      expect(combatant2.name).toBe("Graa");
      expect(combatant2.downed).toBe(2);
    });
  });

  describe("RenderEncounter Empty Round", () => {
    test("it generates the journal entry and saves the json data", async () => {
      const resultFunction = await EncounterRenderer.Render(combatantStatsEmptyRound);
      const result = resultFunction.data;

      expect(result.overview.scene).toStrictEqual(
        combatantStats.overview.scene
      );
      expect(result.enemies).toStrictEqual(combatantStats.enemies);

      expect(result.enemyNumber).toBe(1);

      expect(result.overview.start).toBe("16 September 2022 07:23");
      expect(result.overview.end).toBe("16 September 2022 08:56");
      expect(result.combatants.length).toBe(1);

      const combatant = result.combatants[0];
      expect(combatant.name).toBe("Lorena Aldabra");
      expect(combatant.id).toBe("5H4YnyD6zf9vcJ3P");
      expect(combatant.tokenId).toBe("hoTFHXIbChPmVzQq");
      expect(combatant.img).toBe(
        "tokens/pcs/lorena/lorena_topdown_resting.png"
      );
      expect(combatant.type).toBe("character");
      expect(combatant.abilities).toStrictEqual(
        combatantStats.combatants[0].abilities
      );

      expect(combatant.rounds.length).toBe(2);
      expect(combatant.rounds[0].round).toBe(1);
      expect(combatant.rounds[1].round).toBe(2);

      expect(combatant.rounds[0].attacks.length).toBe(2);
      expect(combatant.rounds[1].attacks.length).toBe(1);

      expect(combatant.rounds[0].attacks[0].item.img).toBe(
        "/img/greatsword.webp"
      );
      expect(combatant.rounds[0].attacks[0].item.name).toBe(
        "Flame Tongue Greatsword"
      );
      expect(combatant.rounds[0].attacks[0].item.itemLink).toBe(
        "@Compendium[dnd5e.items.WWb4vAmh18sMAxfY]{Flame Tongue Greatsword}"
      );
      expect(combatant.rounds[0].attacks[0].damageOrHeal).toBe("red");
      expect(combatant.rounds[0].attacks[0].rollAdvDis).toBe("normal");
      expect(combatant.rounds[0].attacks[0].damageTotal).toBe(12);
      expect(combatant.rounds[0].attacks[0].damageMultipleEnemiesTotal).toBe(
        12
      );
      expect(combatant.rounds[0].attacks[0].actionTypeIcon).toBe(
        '<i title="TestKeyValue" class="fas fa-fist-raised"></i>'
      );

      expect(combatant.rounds[0].kills.length).toBe(1);
      expect(combatant.rounds[1].kills.length).toBe(1);

      expect(combatant.rounds[0].health.length).toBe(1);
      expect(combatant.rounds[0].health[0].current).toBe(24);
      expect(combatant.rounds[0].health[0].diff).toBe("+ 14");
      expect(combatant.rounds[1].health.length).toBe(1);

      expect(combatant.rounds[0].damageTotal).toBe(undefined);
      expect(combatant.rounds[1].damageTotal).toBe(8);

      expect(combatant.downed).toBe(0);
    });
  });

  describe("RenderEncounter Empty Enemies Passed", () => {
    test("it generates the journal entry and saves the json data", async () => {
      const resultFunction = await EncounterRenderer.Render(combatantStatsEmptyEnemies);
      const result = resultFunction.data;

      expect(result.overview.scene).toStrictEqual(
        combatantStatsEmptyEnemies.overview.scene
      );
      expect(result.enemies).toStrictEqual(combatantStatsEmptyEnemies.enemies);

      expect(result.enemyNumber).toBe(0);

      expect(result.overview.start).toBe("16 September 2022 07:23");
      expect(result.overview.end).toBe("16 September 2022 08:56");
      expect(result.combatants.length).toBe(1);

      const combatant = result.combatants[0];
      expect(combatant.name).toBe("Lorena Aldabra");
      expect(combatant.id).toBe("5H4YnyD6zf9vcJ3P");
      expect(combatant.tokenId).toBe("hoTFHXIbChPmVzQq");
      expect(combatant.img).toBe(
        "tokens/pcs/lorena/lorena_topdown_resting.png"
      );
      expect(combatant.type).toBe("character");
      expect(combatant.abilities).toStrictEqual(
        combatantStats.combatants[0].abilities
      );

      expect(combatant.rounds.length).toBe(2);
      expect(combatant.rounds[0].round).toBe(1);
      expect(combatant.rounds[1].round).toBe(2);

      expect(combatant.rounds[0].attacks.length).toBe(2);
      expect(combatant.rounds[1].attacks.length).toBe(1);

      expect(combatant.rounds[0].attacks[0].item.img).toBe(
        "/img/greatsword.webp"
      );
      expect(combatant.rounds[0].attacks[0].item.name).toBe(
        "Flame Tongue Greatsword"
      );
      expect(combatant.rounds[0].attacks[0].item.itemLink).toBe(
        "@Compendium[dnd5e.items.WWb4vAmh18sMAxfY]{Flame Tongue Greatsword}"
      );
      expect(combatant.rounds[0].attacks[0].damageOrHeal).toBe("red");
      expect(combatant.rounds[0].attacks[0].rollAdvDis).toBe("normal");
      expect(combatant.rounds[0].attacks[0].damageTotal).toBe(12);
      expect(combatant.rounds[0].attacks[0].damageMultipleEnemiesTotal).toBe(
        12
      );
      expect(combatant.rounds[0].attacks[0].actionTypeIcon).toBe(
        '<i title="TestKeyValue" class="fas fa-fist-raised"></i>'
      );

      expect(combatant.rounds[0].kills.length).toBe(1);
      expect(combatant.rounds[1].kills.length).toBe(1);

      expect(combatant.rounds[0].health.length).toBe(1);
      expect(combatant.rounds[0].health[0].current).toBe(24);
      expect(combatant.rounds[0].health[0].diff).toBe("+ 14");
      expect(combatant.rounds[1].health.length).toBe(1);

      expect(combatant.rounds[0].damageTotal).toBe(undefined);
      expect(combatant.rounds[1].damageTotal).toBe(8);

      expect(combatant.downed).toBe(0);
    });
  });
});
