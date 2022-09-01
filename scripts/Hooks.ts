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
import StatManager from "./StatManager";
import DND5e from "./parsers/DND5e";
import MidiQol from "./parsers/MidiQol";
import { ChatType } from "./enums";
import Stat from "./stats/Stat";
import PF1 from "./parsers/PF1";

const SOCKET_NAME = "module.encounter-stats";

function _setupSockerListeners() {
  game.socket?.on(SOCKET_NAME, async function (payload) {
    switch (payload.event) {
      case "midi-qol.RollComplete":
        OnEncounterWorkflowComplete(payload.data.workflow, ChatType.MidiQol);
        OnTrackDice(payload.data.rollCheck);
        break;
    }
  });
}

function updateActorToken(actor: Actor, diff: unknown) {
  if (StatManager.IsInCombat()) {
    if (
      actor.name &&
      !actor.hasPlayerOwner &&
      diff.system?.attributes?.hp?.value === 0 &&
      game.combat?.current?.tokenId
    ) {
      OnTrackKill(actor.name, game.combat.current.tokenId);
    }
  }
  if (diff.system?.attributes?.hp && actor.id && !Stat.IsNPC(actor?.type)) {
    OnUpdateHealth(actor);
  }
}

export async function SetupHooks() {
  if (game.user?.isGM) {
    _setupSockerListeners();
    window.Hooks.on(
      "renderCombatTracker",
      async function (
        _combatTracker: CombatTracker,
        _element: string,
        combatData: HookRenderCombatTrackerData
      ) {
        OnRenderCombatTracker(combatData);
      }
    );
    window.Hooks.on("createCombat", async function (data: Combat) {
      OnCreateCombat(data);
    });
    window.Hooks.on("deleteCombat", async function () {
      OnDeleteCombat();
    });
    window.Hooks.on(
      "updateCombat",
      async function (_combat: Combat, data: HookUpdateCombatRound) {
        OnUpdateCombat(data.round);
      }
    );

    window.Hooks.on(
      "updateActor",
      async function (actor: Actor, diff: unknown) {
        updateActorToken(actor, diff);
      }
    );

    window.Hooks.on(
      "updateToken",
      async function (actor: Actor, diff: unknown) {
        updateActorToken(actor, diff);
      }
    );

    if (game.modules.get("midi-qol")?.active) {
      window.Hooks.on(
        "midi-qol.RollComplete",
        async function (workflow: MidiQolWorkflow) {
          OnEncounterWorkflowComplete(
            MidiQol.ParseWorkflow(workflow),
            ChatType.MidiQol
          );
          OnTrackDice(MidiQol.RollCheck(workflow));
        }
      );
    }

    window.Hooks.on(
      "createChatMessage",
      async function (chatMessage: ChatMessage) {
        if (chatMessage?.user?.isGM) {
          if (!game.modules.get("midi-qol")?.active) {
            switch (game.system.name) {
              case "dnd5e":
                OnEncounterWorkflowComplete(
                  await DND5e.ParseChatMessage(chatMessage),
                  ChatType.DND5e
                );
                break;
              case "pf1":
                OnEncounterWorkflowComplete(
                  await PF1.ParseChatMessage(chatMessage),
                  ChatType.PF1
                );
                break;
            }
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
    window.Hooks.on(
      "updateActor",
      async function (actor: Actor, diff: unknown) {
        game.socket?.emit(SOCKET_NAME, {
          event: "updateActor",
          data: { data: actor, diff: diff },
        });
      }
    );
    window.Hooks.on(
      "updateToken",
      async function (actor: Actor, diff: unknown) {
        game.socket?.emit(SOCKET_NAME, {
          event: "updateToken",
          data: { data: actor, diff: diff },
        });
      }
    );
    if (game.modules.get("midi-qol")?.active) {
      window.Hooks.on(
        "midi-qol.RollComplete",
        async function (workflow: MidiQolWorkflow) {
          game.socket?.emit(SOCKET_NAME, {
            event: "midi-qol.RollComplete",
            data: {
              workflow: MidiQol.ParseWorkflow(workflow),
              rollCheck: MidiQol.RollCheck(workflow),
            },
          });
        }
      );
    }
  }
}
