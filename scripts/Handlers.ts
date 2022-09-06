import EncounterJournal from "./EncounterJournal";
import StatManager from "./StatManager";
import Stat from "./stats/Stat";
import MidiQolStat from "./stats/MidiQolStat";
import DND5eStat from "./stats/DND5eStat";
import CampaignStat from "./CampaignStat";
import { ChatType, RoleType } from "./enums";
import Logger from "./Logger";

export async function OnTrackDiceRoll(
  roll: Roll,
  alias: string,
  flavor: string
): Promise<void> {
  const rollValue = roll?.terms[0]?.results?.find(
    (f) => f.active === true
  ).result;
  if (!rollValue) return;

  if (rollValue === 1) {
    CampaignStat.AddRole(RoleType.Fumble, alias, flavor);
  }

  if (rollValue === 20) {
    CampaignStat.AddRole(RoleType.Critial, alias, flavor);
  }
}

export async function OnUpdateCombat(currentRound: number): Promise<void> {
  if (!currentRound) {
    Logger.log(`No new round`, "handlers.OnUpdateCombat", currentRound);
    return;
  }
  const stat = new Stat();

  stat.UpdateRound(currentRound);

  await stat.Save();
  Logger.debug(`Start of round ${currentRound}`, "handlers.OnUpdateCombat");
}

export async function OnRenderCombatTracker(
  combatData: HookRenderCombatTrackerData
): Promise<void> {
  if (!combatData.hasCombat) {
    Logger.log(
      `Combat Tracker Even has no combat active`,
      "handlers.OnRenderCombatTracker",
      combatData
    );
    return;
  }
  const stat = new Stat();

  const combatantsList = combatData.combat.combatants;
  for (const combatant of combatantsList) {
    const actorId = combatant.actorId;
    const tokenId = combatant.tokenId;
    const actor = game.actors?.get(actorId);
    if (actor) {
      stat.AddCombatant(actor, tokenId);
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

  EncounterJournal.CreateJournalEntryPage(encounterId);
  await stat.Save();
  Logger.debug(`Combat Started`, "handlers.OnCreateCombat");
}

export async function OnDeleteCombat(): Promise<void> {
  const stat = new Stat();
  stat.Delete();
  Logger.debug(`Combat Ended`, "handlers.OnDeleteCombat");
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
  if (!StatManager.IsInCombat()) return;
  if (!workflow) return;
  let stat: DND5eStat | MidiQolStat;
  if (chatType === ChatType.DND5e) {
    stat = new DND5eStat();
  } else if (chatType === ChatType.MidiQol) {
    stat = new MidiQolStat();
  } else {
    return;
  }

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
  if (!StatManager.IsInCombat()) return;
  const stat = new Stat();
  stat.UpdateHealth(actor);
  stat.Save();
}

export async function OnTrackKill(
  targetName: string,
  tokenId: string
): Promise<void> {
  if (!StatManager.IsInCombat()) return;
  const stat = new Stat();
  stat.AddKill(targetName, tokenId);
  stat.Save();
  const combatantStat = stat.GetCombatantStatsByTokenId(tokenId);
  if (combatantStat) {
    CampaignStat.AddKill(combatantStat?.name, targetName);
  }
}
