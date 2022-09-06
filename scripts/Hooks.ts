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
import { CombatDetailType, ChatType } from "./enums";
import Stat from "./stats/Stat";

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
      "dnd5e.rollAbilityTest",
      async function (actor: Actor, roll: Roll, abilityId: string) {
        console.debug("dnd5e.rollAbilityTest", actor, roll, abilityId);
        OnTrackDiceRoll(roll, actor.name, roll.options.flavor);
      }
    );

    window.Hooks.on(
      "dnd5e.rollAbilitySave",
      async function (actor: Actor, roll: Roll, abilityId: string) {
        console.debug("dnd5e.rollAbilitySave", actor, roll, abilityId);
        OnTrackDiceRoll(roll, actor.name, roll.options.flavor);
      }
    );

    window.Hooks.on(
      "dnd5e.rollSkill",
      async function (actor: Actor, roll: Roll, skillId: string) {
        console.debug("dnd5e.rollSkill", actor, roll, skillId);
        OnTrackDiceRoll(roll, actor.name, roll.options.flavor);
      }
    );

    window.Hooks.on(
      "dnd5e.useItem",
      async function (item: Item, config: unknown, option: unknown) {
        console.debug("dnd5e.useItem", item, config, option);
        OnEncounterWorkflowComplete(
          await DND5e.ParseChatMessage(
            item,
            item.actor,
            CombatDetailType.ItemCard,
            undefined
          ),
          ChatType.DND5e
        );
      }
    );

    window.Hooks.on(
      "dnd5e.rollAttack",
      async function (item: Item5e, roll: Roll) {
        console.debug("dnd5e.rollAttack", item, roll);
        OnEncounterWorkflowComplete(
          await DND5e.ParseChatMessage(
            item,
            item.actor,
            CombatDetailType.Attack,
            roll
          ),
          ChatType.DND5e
        );
      }
    );

    window.Hooks.on(
      "dnd5e.rollDamage",
      async function (item: Item5e, roll: Roll) {
        console.debug("dnd5e.rollDamage", item, roll);
        OnEncounterWorkflowComplete(
          await DND5e.ParseChatMessage(
            item,
            item.actor,
            CombatDetailType.Damage,
            roll
          ),
          ChatType.DND5e
        );
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
