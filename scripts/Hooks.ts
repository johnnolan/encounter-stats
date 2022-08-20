import {
  MODULE_ID,
  OPT_ENABLE_AOE_DAMAGE,
  OPT_TOGGLE_CAMPAIGN_TRACKING,
} from "./Settings.js";
import {
  OnRenderCombatTracker,
  OnCreateCombat,
  OnDeleteCombat,
  OnCreateChatMessage,
  OnUpdateCombat,
  OnMidiRollComplete,
  OnUpdateHealth,
  OnCreateMeasuredTemplate,
  OnTrackKill,
  OnTrackDiceRoll,
} from "./Handlers.js";
import { IsInCombat } from "./Utils.js";

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
    }
  });
}

function FormatMidiQol(workflow) {
  const wf = {
    _id: workflow.id,
    actor: {
      _id: workflow.actor.id,
    },
    item: {
      _id: workflow.itemId,
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
      if (IsInCombat()) {
        if (!data.hasPlayerOwner && diff.data?.attributes?.hp?.value === 0) {
          OnTrackKill(data.name, game.combat.current.tokenId);
        }
      }
      if (diff.data?.attributes?.hp) {
        OnUpdateHealth(data);
      }
    });

    if (game.modules.get("midi-qol")?.active) {
      window.Hooks.on("midi-qol.RollComplete", async function (workflow) {
        OnMidiRollComplete(FormatMidiQol(workflow));
      });
    } else {
      window.Hooks.on(
        "createChatMessage",
        async function (data, options, user) {
          OnCreateChatMessage(data);
        }
      );
    }

    if (game.settings.get(`${MODULE_ID}`, `${OPT_TOGGLE_CAMPAIGN_TRACKING}`)) {
      window.Hooks.on(
        "createChatMessage",
        async function (data, options, user) {
          if (!data?.user?.isGM) {
            OnTrackDiceRoll(data);
          }
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
    }
  }
}
