import MidiQol from "./parsers/MidiQol";
import {
  ROLL_HOOK,
  ATTACK_DATA_TEMPLATE,
  MODULE_ID,
  OPT_TOGGLE_CAMPAIGN_TRACKING,
} from "./Settings";
import { CampaignTrackNat1, CampaignTrackNat20 } from "./CampaignManager";
import { Encounter, EncounterTop } from "./types/globals";

/*export async function AddDiceRoll(data, type) {
  if (game.settings.get(`${MODULE_ID}`, `${OPT_TOGGLE_CAMPAIGN_TRACKING}`)) {
    let rollResult;

    switch (type) {
      case ROLL_HOOK.MIDI_QOL:
        rollResult = await MidiQol.RollCheck(data);
        break;
      default:
        return;
    }

    if (rollResult) {
      if (rollResult.isCritical) {
        CampaignTrackNat20(rollResult.name, rollResult.flavor);
      }

      if (rollResult.isFumble) {
        CampaignTrackNat1(rollResult.name, rollResult.flavor);
      }
    }
  }
}

export function */
