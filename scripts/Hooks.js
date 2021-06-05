import {
  OnRenderCombatTracker,
  OnCreateCombat,
  OnDeleteCombat,
  OnCreateChatMessage,
  OnUpdateCombat,
  OnUpdateBetterRolls,
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
  window.Hooks.on("updateCombat", async function (arg1, arg2, arg3) {
    OnUpdateCombat(arg2.round);
  });
  window.Hooks.on("createChatMessage", async function (data, options, user) {
    OnCreateChatMessage(data);
  });
  window.Hooks.on("messageBetterRolls", async function (data, options, user) {
    OnUpdateBetterRolls($(options.content), true);
  });
  window.Hooks.on("updateBetterRolls", async function (data, html, user) {
    OnUpdateBetterRolls($(html), false);
  });
}
