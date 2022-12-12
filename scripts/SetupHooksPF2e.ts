import {
  OnRenderCombatTracker,
  OnCreateCombat,
  OnUpdateCombat,
  OnEncounterWorkflowComplete,
  OnUpdateHealth,
  OnTrackKill,
  OnTrackDiceRoll,
  OnCustomEvent,
  OnTrackRollStreak,
} from "./Handlers";
import StatManager from "./StatManager";
import { CombatDetailType, ChatType } from "./enums";
import Stat from "./stats/Stat";
import PF2e from "./parsers/PF2e";

export default class SetupHooksPF2e {
  static SOCKET_NAME = "module.encounter-stats";

  static async Setup() {
    if (game.user?.isGM) {
      SetupHooksPF2e._setupSockerListeners();
      window.Hooks.on(
        "createChatMessage",
        async function (chatMessagePF2e: ChatMessage) {
          let chatType = chatMessagePF2e?.flags?.pf2e?.context?.type;
          if (!chatType) {
            if (chatMessagePF2e.isDamageRoll) {
              chatType = "damage-roll";
            } else {
              return;
            }
          }

          if (chatType === "attack-roll" || chatType === "spell-attack-roll") {
            const workflow = await PF2e.ParseHook(
              chatMessagePF2e.item,
              chatMessagePF2e.actor,
              CombatDetailType.Attack,
              chatMessagePF2e.roll
            );
            OnEncounterWorkflowComplete(workflow, ChatType.PF2e);
            OnTrackRollStreak(
              chatMessagePF2e.roll?.terms[0]?.results?.find(
                (f) => f.active === true
              ).result ?? 0,
              chatMessagePF2e.actor.name,
              chatMessagePF2e.actor.id
            );
          }
          if (chatType === "damage-roll") {
            const workflow = await PF2e.ParseHook(
              chatMessagePF2e.item,
              chatMessagePF2e.item.actor,
              CombatDetailType.Damage,
              chatMessagePF2e.roll
            );
            OnEncounterWorkflowComplete(workflow, ChatType.PF2e);
          }
          if (chatType === "saving-throw" || chatType.indexOf("-check") > 0) {
            OnTrackDiceRoll(
              chatMessagePF2e.roll?.terms[0]?.results?.find(
                (f) => f.active === true
              ).result ?? 0,
              chatMessagePF2e.actor.name,
              chatMessagePF2e?.flags?.pf2e?.modifierName
            );
            OnTrackRollStreak(
              chatMessagePF2e.roll?.terms[0]?.results?.find(
                (f) => f.active === true
              ).result ?? 0,
              chatMessagePF2e.actor.name,
              chatMessagePF2e.actor.id
            );
          }
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
