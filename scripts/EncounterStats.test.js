import { beforeAll } from "@jest/globals";
import EncounterStats from "./EncounterStats.js";
const mockDataCreateCombat = require("../mockData/hookcreateCombat.json");

const stats = new EncounterStats(false);

beforeAll(() => {
  stats.createCombat(mockDataCreateCombat);
});

describe("On first creating a new Encounter", () => {
  test("Expect top level structure to be okay", () => {
    let statsData = stats.getEncounterStats()[0];
    expect(statsData.encounterId).toBe(mockDataCreateCombat._id);
    expect(statsData.sceneId).toBe(mockDataCreateCombat.scene);
    expect(statsData.timestamp).toBe("");
  });

  test("Expect correct number of combatants to be available", () => {
    let statsData = stats.getEncounterStats()[0];
    expect(statsData.combatants.length).toBe(3);
  });

  test("Expect the combatants to have the correct information", () => {
    let statsData = stats.getEncounterStats()[0];
    expect(statsData.combatants.length).toBe(3);
  });
});
