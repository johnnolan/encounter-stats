import {
  OnRenderCombatTracker,
  OnCreateCombat,
  OnUpdateCombat,
  OnEncounterWorkflowComplete,
  OnUpdateHealth,
  OnTrackKill,
  OnTrackDice,
  OnTrackDiceRoll,
  OnCustomEvent,
  OnTrackRollStreak,
} from "./Handlers";
import StatManager from "./StatManager";
import DND5e from "./parsers/DND5e";
import MidiQol from "./parsers/MidiQol";
import { CombatDetailType, ChatType } from "./enums";
import Stat from "./stats/Stat";
import Logger from "./Helpers/Logger";
import PF2e from "./parsers/PF2e";

export default class SetupHooksPF2e {
  static SOCKET_NAME = "module.encounter-stats";

  static async Setup() {
    if (game.user?.isGM) {
      SetupHooksPF2e._setupSockerListeners();
      window.Hooks.on(
        "createChatMessage",
        async function (chatMessagePF2e: ChatMessage) {
          Logger.debug("ChatMessagePF2e", "SetupHooksPF2e", chatMessagePF2e);
          const chatType = chatMessagePF2e.flags.pf2e.context.type;
          if (chatType === "attack-roll") {
            const workflow = await PF2e.ParseHook(
              chatMessagePF2e.item,
              chatMessagePF2e.item.actor,
              CombatDetailType.Attack,
              chatMessagePF2e.roll
            );
            OnEncounterWorkflowComplete(workflow, ChatType.PF2e);
            OnTrackRollStreak(
              workflow.diceTotal,
              workflow.actorName,
              workflow.actorId
            );
          }
          /*game.socket?.emit(SetupHooksPF2e.SOCKET_NAME, {
            event: "pf2e.rollAttack",
            data: {
              EncounterWorkflow: await PF2e.ParseHook(
                item,
                item.actor,
                CombatDetailType.Attack,
                roll
              ),
              ChatType: ChatType.DND5e,
            },
          });*/
        }
      );
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
      window.Hooks.on(
        "updateCombat",
        async function (_combat: Combat, data: HookUpdateCombatRound) {
          OnUpdateCombat(data.round);
        }
      );

      window.Hooks.on(
        "updateActor",
        async function (actor: Actor, diff: unknown) {
          await SetupHooksPF2e.updateActorToken(actor, diff);
        }
      );

      window.Hooks.on(
        "updateToken",
        async function (actor: Actor, diff: unknown) {
          await SetupHooksPF2e.updateActorToken(actor, diff);
        }
      );

      Hooks.on(
        "encounter-stats.customEvent",
        async function (customEvent: HookCustomEvent) {
          OnCustomEvent(customEvent);
        }
      );
    } else {
      window.Hooks.on(
        "updateActor",
        async function (actor: Actor, diff: unknown) {
          game.socket?.emit(SetupHooksPF2e.SOCKET_NAME, {
            event: "updateActor",
            data: { data: actor, diff: diff },
          });
        }
      );
      window.Hooks.on(
        "updateToken",
        async function (actor: Actor, diff: unknown) {
          game.socket?.emit(SetupHooksPF2e.SOCKET_NAME, {
            event: "updateToken",
            data: { data: actor, diff: diff },
          });
        }
      );
    }
  }

  static _setupSockerListeners() {
    game.socket?.on(
      SetupHooksPF2e.SOCKET_NAME,
      async function (payload: unknown) {
        switch (payload.event) {
          case "encounter-stats.customEvent":
            OnCustomEvent(payload.data.customEvent);
            break;
          case "midi-qol.RollComplete":
            OnEncounterWorkflowComplete(
              payload.data.workflow,
              ChatType.MidiQol
            );
            OnTrackDice(payload.data.rollCheck);
            OnTrackRollStreak(
              payload.data.workflow.diceTotal,
              payload.data.rollCheck.name,
              payload.data.workflow.actor.id
            );
            break;
          case "dnd5e.rollAttack":
            OnEncounterWorkflowComplete(
              payload.data.EncounterWorkflow,
              payload.data.ChatType
            );
            OnTrackRollStreak(
              payload.data.EncounterWorkflow.diceTotal,
              payload.data.EncounterWorkflow.actorName,
              payload.data.EncounterWorkflow.actorId
            );
            break;
          case "dnd5e.useItem":
          case "dnd5e.rollDamage":
            OnEncounterWorkflowComplete(
              payload.data.EncounterWorkflow,
              payload.data.ChatType
            );
            break;
          case "dnd5e.rollAbilityTest":
          case "dnd5e.rollAbilitySave":
          case "dnd5e.rollSkill":
            OnTrackDiceRoll(
              payload.data.result,
              payload.data.alias,
              payload.data.flavor
            );
            OnTrackRollStreak(
              payload.data.result,
              payload.data.alias,
              payload.data.actorId
            );
            break;
        }
      }
    );
  }

  static async updateActorToken(actor: Actor, diff: unknown) {
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
    if (
      diff.system?.attributes?.hp &&
      actor.id &&
      Stat.IsValidCombatant(actor?.type)
    ) {
      OnUpdateHealth(actor);
    }
  }
}
