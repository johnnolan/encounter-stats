import EncounterJournal from "./EncounterJournal";
import StatManager from "./StatManager";
import Stat from "./stats/Stat";
import MidiQolStat from "./stats/MidiQolStat";
import DND5eStat from "./stats/DND5eStat";
import CampaignStat from "./CampaignStat";
import { ChatType, RoleType } from "./enums";
import Logger from "./Helpers/Logger";

export async function OnTrackDiceRoll(
  result: number,
  alias: string,
  flavor: string
): Promise<void> {
  if (!result) return;

  if (result === 1) {
    CampaignStat.AddRole(RoleType.Fumble, alias, flavor);
  }

  if (result === 20) {
    CampaignStat.AddRole(RoleType.Critial, alias, flavor);
  }
}

export async function OnUpdateCombat(currentRound: number): Promise<void> {
  if (!currentRound) {
    Logger.log(`No new round`, "handlers.OnUpdateCombat", currentRound);
    return;
  }
  if (!(await StatManager.IsInCombat())) return;
  const stat = new Stat();
  stat.encounter = await StatManager.GetStat();

  stat.UpdateRound(currentRound);

  await stat.Save();
  Logger.debug(`Start of round ${currentRound}`, "handlers.OnUpdateCombat");
}

export async function OnRenderCombatTracker(
  combatData: HookRenderCombatTrackerData
): Promise<void> {
  if (!combatData.hasCombat) {
    Logger.log(
      `Combat Tracker Event has no combat active`,
      "handlers.OnRenderCombatTracker",
      combatData
    );
    return;
  }
  if (!(await StatManager.IsInCombat())) return;
  const stat = new Stat();
  stat.encounter = await StatManager.GetStat();

  const combatantsList = combatData.combat.combatants;
  for (const combatant of combatantsList) {
    const actorId = combatant.actorId;
    const tokenId = combatant.tokenId;
    const initiative = combatant.initiative;
    const actor = game.actors?.get(actorId);
    if (actor) {
      stat.AddCombatant(actor, tokenId, initiative);
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
      diceTrackParsed.flavor
    );
  }
}

export async function OnEncounterWorkflowComplete(
  workflow: EncounterWorkflow | undefined,
  chatType: ChatType
): Promise<void> {
  if (!(await StatManager.IsInCombat())) return;
  if (!workflow) return;
  let stat: DND5eStat | MidiQolStat;
  if (chatType === ChatType.DND5e) {
    stat = new DND5eStat();
  } else if (chatType === ChatType.MidiQol) {
    stat = new MidiQolStat();
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
        workflow.damageTotal ?? 0
      );
    } else {
      Logger.warn(
        `Missing Combatant for Heal`,
        "handlers.OnEncounterWorkflowComplete",
        workflow
      );
    }
  }
}

export async function OnUpdateHealth(actor: Actor): Promise<void> {
  if (!(await StatManager.IsInCombat())) return;
  const stat = new Stat();
  stat.encounter = await StatManager.GetStat(actor.id);
  stat.UpdateHealth(actor);
  stat.Save();
}

export async function OnTrackKill(
  targetName: string,
  tokenId: string
): Promise<void> {
  if (!(await StatManager.IsInCombat())) return;
  const stat = new Stat();
  stat.encounter = await StatManager.GetStat();
  stat.AddKill(targetName, tokenId);
  stat.Save();
  const combatantStat = stat.GetCombatantStatsByTokenId(tokenId);
  if (combatantStat) {
    CampaignStat.AddKill(combatantStat?.name, targetName);
  }
}
