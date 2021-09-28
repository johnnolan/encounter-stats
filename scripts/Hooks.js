import { MODULE_ID, OPT_ENABLE_AOE_DAMAGE } from "./Settings.js";
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
  OnMars5e,
  OnCreateMeasuredTemplate,
} from "./Handlers.js";

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

function FormatMidiQol(workflow) {
  const wf = {
    _id: workflow._id,
    actor: {
      _id: workflow.actor._id,
    },
    item: {
      _id: workflow.item._id,
    },
    attackRoll: workflow.attackRoll,
    damageRoll: workflow.damageRoll,
    damageTotal: workflow.damageTotal,
    attackTotal: workflow.attackTotal,
    workflowType: workflow.workflowType,
    advantage: workflow.advantage,
    disadvantage: workflow.disadvantage,
    isCritical: workflow.isCritical,
    isFumble: workflow.isFumble,
  };

  return wf;
}

export async function SetupHooks() {
  if (game.user.isGM) {
    _setupSockerListeners();
    if (game.settings.get(`${MODULE_ID}`, `${OPT_ENABLE_AOE_DAMAGE}`)) {
      window.Hooks.on(
        "createMeasuredTemplate",
        async function (data, arg2, arg3) {
          OnCreateMeasuredTemplate(data);
        }
      );
    }
    window.Hooks.on("renderCombatTracker", async function (arg1, arg2, data) {
      OnRenderCombatTracker(data);
    });
    window.Hooks.on("createCombat", async function (data, arg2, arg3) {
      OnCreateCombat(data);
    });
    window.Hooks.on("deleteCombat", async function (data, arg2, arg3) {
      OnDeleteCombat();
    });
    window.Hooks.on("updateCombat", async function (arg1, data, arg3) {
      OnUpdateCombat(data.round);
    });

    window.Hooks.on("updateActor", async function (data, diff) {
      if (diff.data?.attributes?.hp) {
        OnUpdateHealth(data);
      }
    });
    if (game.modules.get("midi-qol")?.active) {
      window.Hooks.on("midi-qol.RollComplete", async function (workflow) {
        OnMidiRollComplete(FormatMidiQol(workflow));
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
    } else if (game.modules.get("mars-5e")?.active) {
      window.Hooks.on(
        "createChatMessage",
        async function (data, options, user) {
          OnMars5e(data, true);
        }
      );
      window.Hooks.on("updateChatMessage", async function (data) {
        OnMars5e(data, false);
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
          data: FormatMidiQol(workflow),
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
