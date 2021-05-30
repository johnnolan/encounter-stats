import {
  OnRenderCombatTracker,
  OnCreateCombat,
  OnDeleteCombat,
  OnMidiQolRollComplete,
  OnUpdateCombat,
} from "./FvttEncounterStats.js";

export async function SetupHooks() {
  window.Hooks.on("renderCombatTracker", async function (arg1, arg2, arg3) {
    OnRenderCombatTracker(arg3);
  });
  window.Hooks.on("createCombat", async function (arg1, arg2, arg3) {
    OnCreateCombat(arg1);
  });
  window.Hooks.on("deleteCombat", async function (arg1, arg2, arg3) {
    OnDeleteCombat(arg1);
  });
  window.Hooks.on("midi-qol.RollComplete", async function (attackData) {
    OnMidiQolRollComplete(attackData);
  });
  window.Hooks.on("updateCombat", async function (arg1, arg2, arg3) {
    OnUpdateCombat(arg2.round);
  });
}
