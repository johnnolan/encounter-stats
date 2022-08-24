import {
  OnRenderCombatTracker,
  OnCreateCombat,
  OnDeleteCombat,
  OnUpdateCombat,
  OnMidiRollComplete,
  OnUpdateHealth,
  OnTrackKill,
  OnTrackDice,
  OnTrackDiceRoll,
} from "./Handlers";
import MidiQol from "./parsers/MidiQol";
import { IsInCombat } from "./Utils";
import { MidiQolWorkflow } from "./types/globals";

const SOCKET_NAME = "module.encounter-stats";

function _setupSockerListeners() {
  game.socket.on(SOCKET_NAME, async function (payload) {
    switch (payload.event) {
      case "updateActor":
        OnUpdateHealth(payload.data);
        break;
      case "midi-qol.RollComplete":
        OnMidiRollComplete(MidiQol.ParseWorkflow(payload.data));
        OnTrackDice(await MidiQol.RollCheck(payload.data));
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
          OnMidiRollComplete(MidiQol.ParseWorkflow(workflow));
          OnTrackDice(await MidiQol.RollCheck(workflow));
        }
      );
    }

    window.Hooks.on(
      "createChatMessage",
      async function (chatMessage: ChatMessage, options, user) {
        console.debug(chatMessage, options, user);
        if (!chatMessage?.user?.isGM) {
          OnTrackDiceRoll(
            chatMessage.rolls,
            chatMessage.speaker.alias,
            chatMessage.flavor
          );
        }
      }
    );

    /* else {
      window.Hooks.on(
        "createChatMessage",
        async function (data, options, user) {
          OnCreateChatMessage(data);
        }
      );
    }*/

    /*if (game.settings.get(`${MODULE_ID}`, `${OPT_TOGGLE_CAMPAIGN_TRACKING}`)) {
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
    /*window.Hooks.on("updateActor", async function (data, diff) {
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
          data: MidiQol.ParseWorkflow(workflow),
        });
      });
    }*/
  } else {
    /*window.Hooks.on("updateActor", async function (data, diff) {
      if (diff.data?.attributes?.hp) {
        game.socket.emit(SOCKET_NAME, {
          event: "updateActor",
          data: data,
        });
      }
    });*/
    if (game.modules.get("midi-qol")?.active) {
      window.Hooks.on("midi-qol.RollComplete", async function (workflow) {
        game.socket.emit(SOCKET_NAME, {
          event: "midi-qol.RollComplete",
          data: MidiQol.ParseWorkflow(workflow),
        });
      });
    }
  }
}
