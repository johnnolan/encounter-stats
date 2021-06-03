import {
  OnRenderCombatTracker,
  OnCreateCombat,
  OnDeleteCombat,
  OnMidiQolRollComplete,
  OnUpdateCombat,
} from "./FvttEncounterStats.js";
import { AddAttackStandard } from "./DataParsing.js";

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
  /*window.Hooks.on("midi-qol.RollComplete", async function (attackData) {
    OnMidiQolRollComplete(attackData);
  });*/
  window.Hooks.on("updateCombat", async function (arg1, arg2, arg3) {
    OnUpdateCombat(arg2.round);
  });
  window.Hooks.on("preCreateChatMessage", async function (data, options, user) {
    console.debug("FVTTEncounterStats preCreateChatMessage data", data);
    console.debug("FVTTEncounterStats preCreateChatMessage options", options);
    console.debug("FVTTEncounterStats preCreateChatMessage user", user);
  });
  window.Hooks.on("createChatMessage", async function (data, options, user) {
    const attackData = AddAttackStandard(data);
    console.debug(
      "FVTTEncounterStats createChatMessage - attackData",
      attackData
    );

    /*if (data._roll) {
      console.debug(
        "FVTTEncounterStats createChatMessage - data: data._roll.total",
        data._roll.total
      );
      console.debug(
        "FVTTEncounterStats createChatMessage - data: data._roll.options.critical",
        data._roll.options.critical
      );
      console.debug(
        "FVTTEncounterStats createChatMessage - data: data.data.flags.dnd5e.roll.itemId",
        data.data.flags.dnd5e.roll.itemId
      );
      console.debug(
        "FVTTEncounterStats createChatMessage - data: data.data.flags.dnd5e.roll.type",
        data.data.flags.dnd5e.roll.type
      );
      console.debug(
        "FVTTEncounterStats createChatMessage - data: data.data.user",
        data.data.user
      );
      console.debug(
        "FVTTEncounterStats createChatMessage - data: data.data.speaker.token",
        data.data.speaker.token
      );
      console.debug(
        "FVTTEncounterStats createChatMessage - data: data.data.speaker.actor",
        data.data.speaker.actor
      );
    }*/
    console.debug("FVTTEncounterStats createChatMessage data", data);
    console.debug("FVTTEncounterStats createChatMessage options", options);
    console.debug("FVTTEncounterStats createChatMessage user", user);
  });
}
