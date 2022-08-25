import {
  OnRenderCombatTracker,
  OnCreateCombat,
  OnDeleteCombat,
  OnUpdateCombat,
  OnEncounterWorkflowComplete,
  OnUpdateHealth,
  OnTrackKill,
  OnTrackDice,
  OnTrackDiceRoll,
} from "./Handlers";
import { IsInCombat } from "./Utils";
import { MidiQolWorkflow } from "./types/globals";
import DND5e from "./parsers/DND5e";
import MidiQol from "./parsers/MidiQol";

const SOCKET_NAME = "module.encounter-stats";

function _setupSockerListeners() {
  game.socket.on(SOCKET_NAME, async function (payload) {
    switch (payload.event) {
      case "updateActor":
      case "updateToken":
        updateActorToken(payload.data.data, payload.data.diff);
        break;
      case "midi-qol.RollComplete":
        OnEncounterWorkflowComplete(payload.data.workflow);
        OnTrackDice(payload.data.rollCheck);
        break;
    }
  });
}

function updateActorToken(data, diff) {
  if (IsInCombat()) {
    if (!data.hasPlayerOwner && diff.system?.attributes?.hp?.value === 0) {
      OnTrackKill(data.name, game.combat.current.tokenId);
    }
  }
  if (diff.system?.attributes?.hp) {
    OnUpdateHealth(data);
  }
}

export async function SetupHooks() {
  if (game.user.isGM) {
    _setupSockerListeners();
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
      updateActorToken(data, diff);
    });

    window.Hooks.on("updateToken", async function (data, diff) {
      updateActorToken(data, diff);
    });

    if (game.modules.get("midi-qol")?.active) {
      window.Hooks.on(
        "midi-qol.RollComplete",
        async function (workflow: MidiQolWorkflow) {
          OnEncounterWorkflowComplete(MidiQol.ParseWorkflow(workflow));
          OnTrackDice(await MidiQol.RollCheck(workflow));
        }
      );
    }

    window.Hooks.on(
      "createChatMessage",
      async function (chatMessage: ChatMessage, options, user) {
        if (!chatMessage?.user?.isGM) {
          if (!game.modules.get("midi-qol")?.active) {
            OnEncounterWorkflowComplete(
              await DND5e.ParseChatMessage(chatMessage)
            );
          }
          OnTrackDiceRoll(
            chatMessage.rolls,
            chatMessage.speaker.alias,
            chatMessage.flavor
          );
        }
      }
    );
  } else {
    window.Hooks.on("updateActor", async function (data, diff) {
      game.socket.emit(SOCKET_NAME, {
        event: "updateActor",
        data: { data: data, diff: diff },
      });
    });
    window.Hooks.on("updateToken", async function (data, diff) {
      game.socket.emit(SOCKET_NAME, {
        event: "updateToken",
        data: { data: data, diff: diff },
      });
    });
    if (game.modules.get("midi-qol")?.active) {
      window.Hooks.on("midi-qol.RollComplete", async function (workflow) {
        game.socket.emit(SOCKET_NAME, {
          event: "midi-qol.RollComplete",
          data: {
            workflow: MidiQol.ParseWorkflow(workflow),
            rollCheck: await MidiQol.RollCheck(workflow),
          },
        });
      });
    }
  }
}
