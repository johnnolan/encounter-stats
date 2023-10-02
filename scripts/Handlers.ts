import EncounterJournal from "./EncounterJournal";
import StatManager from "./StatManager";
import Stat from "./stats/Stat";
import MidiQolStat from "./stats/MidiQolStat";
import DND5eStat from "./stats/DND5eStat";
import CampaignStat from "./CampaignStat";
import { ChatRollMode, ChatType, RoleType } from "./enums";
import Logger from "./Helpers/Logger";
import { EncounterWorkflow } from "EncounterWorkflow";
import PF2eStat from "./stats/PF2eStat";
import ReadySetRollStat from "./stats/ReadySetRollStat";

export function OnCustomEvent(customEvent: HookCustomEvent): void {
  CampaignStat.AddCustomEvent(customEvent);
}

export async function OnTrackRollStreak(
  result: number,
  actorName: string,
  actorId: string,
  chatRollMode: ChatRollMode,
): Promise<void> {
  if (!result) return;
  CampaignStat.AddRollStreak(result, actorName, actorId, chatRollMode);
}

export async function OnTrackDiceRoll(
  result: number,
  alias: string,
  flavor: string,
): Promise<void> {
  if (!result) return;

  if (result === 1) {
    CampaignStat.AddRole(RoleType.Fumble, alias, flavor);
  }

  if (result === 20) {
    CampaignStat.AddRole(RoleType.Critial, alias, flavor);
  }
}

export async function OnDeleteCombat(combat: Combat): Promise<void> {
  if (!combat) {
    Logger.log(`No combat`, "handlers.OnDeleteCombat", combat);
    return;
  }
  if (!StatManager.IsInCombat()) return;
  const stat = new Stat();
  stat.encounter = await StatManager.GetStat();

  CampaignStat.AddPartyEncounterStat(
    stat.encounter.partySummary,
    stat.encounter.encounterId ?? "",
  );
}

export async function OnUpdateCombat(
  currentRound: number | undefined,
  combat: Combat | undefined = undefined,
): Promise<void> {
  if (!currentRound) {
    Logger.log(`No new round`, "handlers.OnUpdateCombat", currentRound);
    return;
  }
  if (!StatManager.IsInCombat()) return;
  const stat = new Stat();
  stat.encounter = await StatManager.GetStat();

  const totalCombatants =
    stat?.encounter?.combatants?.length ??
    0 + stat?.encounter?.enemies?.length ??
    0;

  if (combat && totalCombatants < combat.combatants.size) {
    const combatantsList = combat.combatants;
    for (const combatant of combatantsList) {
      if (combatant.isNPC) {
        if (
          !stat.encounter.enemies.some((e) => e.tokenId === combatant.tokenId)
        ) {
          const actor = game.actors?.get(combatant.actorId);
          if (actor) {
            stat.AddEnemy(<Enemies>{
              tokenId: combatant.tokenId,
              name: combatant.name,
              img: combatant.actor.img,
              ac: combatant.actor.system.attributes.ac.value,
              hp: combatant.actor.system.attributes.hp.value,
            });
          }
        }
      }
    }
  }

  stat.UpdateRound(currentRound);
  stat.UpdateEnd();

  await stat.Save();
  Logger.debug(`Start of round ${currentRound}`, "handlers.OnUpdateCombat");
}

export async function OnRenderCombatTracker(
  combatData: HookRenderCombatTrackerData,
): Promise<void> {
  if (!combatData.hasCombat) {
    Logger.log(
      `Combat Tracker Event has no combat active`,
      "handlers.OnRenderCombatTracker",
      combatData,
    );
    return;
  }
  if (!StatManager.IsInCombat()) return;
  const stat = new Stat();
  stat.encounter = await StatManager.GetStat();

  stat.UpdateScene(
    combatData.combat.scene?.id ?? "",
    combatData.combat.scene?.name ?? "",
    combatData.combat.scene?.thumb ?? "",
  );

  let addEnemies = false;
  if (stat.encounter?.enemies?.length === 0) {
    addEnemies = true;
  }

  const combatantsList = combatData.combat.combatants;
  for (const combatant of combatantsList) {
    const actorId = combatant.actorId;
    const tokenId = combatant.tokenId;
    const initiative = combatant.initiative;
    const actor = game.actors?.get(actorId);
    if (actor) {
      if (addEnemies && combatant.actor?.type === "npc") {
        stat.AddEnemy(<Enemies>{
          tokenId: combatant.tokenId,
          name: combatant.name,
          img: combatant.actor.img,
          ac: combatant.actor.system.attributes.ac.value,
          hp: combatant.actor.system.attributes.hp.value,
        });
      } else {
        await stat.AddCombatant(actor, tokenId, initiative);
      }
    }
  }
  await stat.Save();
  Logger.debug(`Combatants Added`, "handlers.OnRenderCombatTracker");
}

export async function OnCreateCombat(combat: Combat): Promise<void> {
  const encounterId = combat.id;
  if (!encounterId) {
    Logger.error(`Missing encounterId`, "handlers.OnCreateCombat", combat);
    return;
  }
  const stat = new Stat(encounterId);

  await EncounterJournal.CreateJournalEntryPage(encounterId);
  await stat.Save();
  Logger.debug(`Combat Started`, "handlers.OnCreateCombat");
}

export async function OnTrackDice(diceTrackParsed: DiceTrackParse | undefined) {
  if (
    diceTrackParsed &&
    (diceTrackParsed.isCritical || diceTrackParsed.isFumble)
  ) {
    CampaignStat.AddRole(
      diceTrackParsed.isCritical ? RoleType.Critial : RoleType.Fumble,
      diceTrackParsed.name,
      diceTrackParsed.flavor,
    );
  }
}

export async function OnEncounterWorkflowComplete(
  workflow: EncounterWorkflow | undefined,
  chatType: ChatType,
): Promise<void> {
  if (!StatManager.IsInCombat()) return;
  if (!workflow) return;
  let stat: DND5eStat | MidiQolStat;
  if (chatType === ChatType.DND5e) {
    stat = new DND5eStat();
  } else if (chatType === ChatType.PF2e) {
    stat = new PF2eStat();
  } else if (chatType === ChatType.MidiQol) {
    stat = new MidiQolStat();
  } else if (chatType === ChatType.RSR) {
    stat = new ReadySetRollStat();
  } else {
    return;
  }

  stat.encounter = await StatManager.GetStat(workflow.actor.id);
  stat.AddAttack(workflow);
  stat.Save();

  if (
    workflow.actionType &&
    workflow.item &&
    stat.IsHealingSpell(workflow.actionType)
  ) {
    const combatantStat = stat.GetCombatantStats(workflow.actor.id);
    if (combatantStat) {
      CampaignStat.AddHeal(
        combatantStat.name,
        workflow.item.link,
        workflow.item.name,
        workflow.damageTotal ?? 0,
      );
    } else {
      Logger.warn(
        `Missing Combatant for Heal`,
        "handlers.OnEncounterWorkflowComplete",
        workflow,
      );
    }
  }
}

export async function OnUpdateHealth(actor: Actor): Promise<void> {
  if (!StatManager.IsInCombat()) return;
  const stat = new Stat();
  stat.encounter = await StatManager.GetStat(actor.id);
  stat.UpdateHealth(actor);
  stat.Save();
}

export async function OnTrackKill(
  targetName: string,
  tokenId: string,
): Promise<void> {
  if (!StatManager.IsInCombat()) return;
  const stat = new Stat();
  stat.encounter = await StatManager.GetStat();
  stat.AddKill(targetName, tokenId);
  stat.Save();
  const combatantStat = stat.GetCombatantStatsByTokenId(tokenId);
  if (combatantStat) {
    CampaignStat.AddKill(combatantStat?.name, targetName);
  }
}
