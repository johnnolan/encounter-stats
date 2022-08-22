import EncounterJournal from "./EncounterJournal";
import TrackKill from "./parsers/TrackKill";
import {
  ROLL_HOOK,
  MODULE_ID,
  OPT_ENABLE_AOE_DAMAGE,
  OPT_TOGGLE_CAMPAIGN_TRACKING,
} from "./Settings";
import { TargetsHit, ResetTemplateHealthCheck, IsInCombat } from "./Utils";
import {
  CampaignTrackNat1,
  CampaignTrackNat20,
} from "./CampaignManager";
import Stat from "./Stat";
import { EncounterMidiWorkflow } from "./types/globals";

export async function OnTrackDiceRoll(data): Promise<void> {
  if (data !== undefined) {
    if (data.data.roll !== undefined) {
      if (data.roll.dice[0].faces === 20) {
        if (
          data.roll.dice[0].results.filter((f) => {
            return f.active;
          })[0].result === 1
        ) {
          CampaignTrackNat1(data.data.speaker.alias, data.data.flavor);
        }

        if (
          data.roll.dice[0].results.filter((f) => {
            return f.active;
          })[0].result === 20
        ) {
          CampaignTrackNat20(data.data.speaker.alias, data.data.flavor);
        }
      }
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
  /*if (game.settings.get(`${MODULE_ID}`, `${OPT_TOGGLE_CAMPAIGN_TRACKING}`)) {
    const date = new Date();
    await CampaignTrack(date.toISOString());
  }*/
  const stat = new Stat();
  stat.Delete();
}

export async function OnCreateChatMessage(attackData): Promise<void> {
  if (!IsInCombat()) return;
  AddAttack(attackData, ROLL_HOOK.DEFAULT);
}

export async function OnMidiRollComplete(
  workflow: EncounterMidiWorkflow
): Promise<void> {
  if (!IsInCombat()) return;
  const stat = new Stat();
  stat.AddAttack(workflow, stat.currentRound);
  stat.Save();
}

export async function OnUpdateHealth(actor: Actor): Promise<void> {
  if (!IsInCombat()) return;
  const stat = new Stat();
  stat.UpdateHealth(actor);
  stat.Save();
}

export async function OnTrackKill(targetName, tokenId): Promise<void> {
  if (!IsInCombat()) return;
  const stat = new Stat();
  stat.AddKill(targetName, tokenId);
  stat.Save();
}
