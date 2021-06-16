import {
  OnRenderCombatTracker,
  OnCreateCombat,
  OnDeleteCombat,
  OnCreateChatMessage,
  OnUpdateCombat,
  OnUpdateBetterRolls,
  OnMidiRollComplete,
  OnUpdateHealth,
  OnBeyond20,
} from "./FvttEncounterStats.js";

const SOCKET_NAME = "module.fvtt-encounter-stats";

function _setupSockerListeners() {
  game.socket.on(SOCKET_NAME, function (payload) {
    switch (payload.event) {
      case "updateActor":
        OnUpdateHealth(payload.data);
        break;
      case "midi-qol.RollComplete":
        OnMidiRollComplete(payload.data);
        break;
      case "messageBetterRolls":
      case "updateBetterRolls":
        OnUpdateBetterRolls($(payload.data), payload.isNew);
        break;
    }
  });
}

export async function SetupHooks() {
  if (game.user.isGM) {
    _setupSockerListeners();
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

    window.Hooks.on("updateActor", async function (data, diff) {
      if (diff.data?.attributes?.hp) {
        OnUpdateHealth(data);
      }
    });
    if (game.modules.get("midi-qol")?.active) {
      window.Hooks.on("midi-qol.RollComplete", async function (workflow) {
        OnMidiRollComplete(workflow);
      });
    } else if (game.modules.get("betterrolls5e")?.active) {
      window.Hooks.on(
        "messageBetterRolls",
        async function (data, options, user) {
          OnUpdateBetterRolls($(options.content), true);
        }
      );
      window.Hooks.on("updateBetterRolls", async function (data, html, user) {
        OnUpdateBetterRolls($(html), false);
      });
    } else {
      window.Hooks.on(
        "createChatMessage",
        async function (data, options, user) {
          OnCreateChatMessage(data);
        }
      );
    }
    if (game.modules.get("beyond20")?.active) {
      window.Hooks.on(
        "createChatMessage",
        async function (data, options, user) {
          OnBeyond20(data);
        }
      );
    }
  } else {
    window.Hooks.on("updateActor", async function (data, diff) {
      if (diff.data?.attributes?.hp) {
        game.socket.emit(SOCKET_NAME, {
          event: "updateActor",
          data: data,
        });
      }
    });
    if (game.modules.get("midi-qol")?.active) {
      window.Hooks.on("midi-qol.RollComplete", async function (workflow) {
        game.socket.emit(SOCKET_NAME, {
          event: "midi-qol.RollComplete",
          data: workflow,
        });
      });
    } else if (game.modules.get("betterrolls5e")?.active) {
      window.Hooks.on(
        "messageBetterRolls",
        async function (data, options, user) {
          game.socket.emit(SOCKET_NAME, {
            event: "messageBetterRolls",
            data: options.content,
            isNew: true,
          });
        }
      );
      window.Hooks.on("updateBetterRolls", async function (data, html, user) {
        game.socket.emit(SOCKET_NAME, {
          event: "updateBetterRolls",
          data: html,
          isNew: false,
        });
      });
    }
  }
}
