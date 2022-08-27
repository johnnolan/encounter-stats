import EncounterJournal from "./EncounterJournal";
import StatManager from "./StatManager";
import Stat from "./Stat";
import MidiQolStat from "./MidiQolStat";
import DND5eStat from "./DND5eStat";
import CampaignStat from "./CampaignStat";
import { ChatType, RoleType } from "./enums";

export async function OnTrackDiceRoll(
  rolls: Array<Roll>,
  alias: string,
  flavor: string
): Promise<void> {
  if (rolls.length !== 1) return;

  const dice: DiceTerm = rolls[0].dice[0];
  if (dice.faces === 20) {
    if (dice.total === 1) {
      CampaignStat.AddRole(RoleType.Fumble, alias, flavor);
    }

    if (dice.total === 20) {
      CampaignStat.AddRole(RoleType.Critial, alias, flavor);
    }
  }
}

export async function OnUpdateCombat(currentRound: number): Promise<void> {
  if (!currentRound) return;
  const stat = new Stat();

  stat.UpdateRound(currentRound);

  await stat.Save();
}

export async function OnRenderCombatTracker(data: any): Promise<void> {
  if (!data.hasCombat) return;
  const stat = new Stat();

  const combatantsList = data.combat.combatants;
  for (const element of combatantsList) {
    const actorId = element.actorId;
    const tokenId = element.tokenId;
    stat.AddCombatant(game.actors.get(actorId), tokenId);
  }
  await stat.Save();
}

export async function OnCreateCombat(combat: Combat): Promise<void> {
  const encounterId = combat.id;
  if (!encounterId) return;
  const stat = new Stat(encounterId);

  EncounterJournal.CreateJournalEntryPage(encounterId);
  await stat.Save();
}

export async function OnDeleteCombat(): Promise<void> {
  const stat = new Stat();
  stat.Delete();
}

export async function OnTrackDice(diceTrackParsed: DiceTrackParse) {
  if (diceTrackParsed.isCritical || diceTrackParsed.isFumble) {
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

  if (stat.IsHealingSpell(workflow.actionType)) {
    const combatantStat = stat.GetCombatantStats(workflow.actor.id);
    if (combatantStat) {
      CampaignStat.AddHeal(
        combatantStat.name,
        workflow.item.link,
        workflow.item.name,
        workflow.damageTotal
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
