import { CreateJournal } from "./Journal.js";
import { AddCombatants, AddAttack } from "./DataParsing.js";
import UpdateHealth from "./parsers/UpdateHealth.js";
import TrackKill from "./parsers/TrackKill.js";
import { ROLL_HOOK, MODULE_ID, OPT_ENABLE_AOE_DAMAGE } from "./Settings.js";
import { GetStat, SaveStat, RemoveStat } from "./StatManager.js";
import { TargetsHit, ResetTemplateHealthCheck } from "./Utils.js";

async function _createCombat(data) {
  const encounterId = data.data._id;
  if (!encounterId) return "";
  let stat = {
    encounterId: encounterId,
    round: 1,
    combatants: [],
    top: {
      maxDamage: "",
      mostDamageInOneTurn: "",
      highestAvgDamage: "",
      highestMaxDamage: "",
    },
    templateHealthCheck: [],
  };
  await CreateJournal(encounterId);
  await SaveStat(stat);
}

async function _addCombatants(data) {
  if (!data.combat) return;
  const combatantsList = data.combat.data._source.combatants;
  for (let i = 0; i < combatantsList.length; i++) {
    const actorId = combatantsList[i].actorId;
    const tokenId = combatantsList[i].tokenId;
    AddCombatants(game.actors.get(actorId), tokenId);
  }
}

async function _updateRound(currentRound) {
  if (!currentRound) return;
  let stat = GetStat();
  if (stat.round !== currentRound) {
    stat.round = currentRound;
    await SaveStat(stat);
  }
}

export async function OnCreateMeasuredTemplate(data) {
  if (!_isInCombat()) return;
  await TargetsHit(data);
}

export async function OnRenderCombatTracker(arg3) {
  await _addCombatants(arg3);
}

export async function OnCreateCombat(arg1) {
  _createCombat(arg1);
}

export async function OnDeleteCombat() {
  RemoveStat();
}

export async function OnCreateChatMessage(attackData) {
  if (!_isInCombat()) return;
  AddAttack(attackData, ROLL_HOOK.DEFAULT);
}

export async function OnBeyond20(workflow) {
  if (!_isInCombat()) return;
  AddAttack(workflow, ROLL_HOOK.BEYOND_20);
}

export async function OnMars5e(data, isNew) {
  if (!_isInCombat()) return;
  AddAttack(data, ROLL_HOOK.MARS5E, isNew);
}

export async function OnMidiRollComplete(workflow) {
  if (!_isInCombat()) return;
  AddAttack(workflow, ROLL_HOOK.MIDI_QOL);
}

export async function OnUpdateBetterRolls(attackData, isNew) {
  if (!_isInCombat()) return;
  AddAttack(attackData, ROLL_HOOK.BETTERROLLS5E, isNew);
}

export async function OnUpdateHealth(data) {
  if (!_isInCombat()) return;
  UpdateHealth(data);
}

export async function OnTrackKill(targetName, tokenId) {
  if (!_isInCombat()) return;
  TrackKill(targetName, tokenId);
}

export async function OnUpdateCombat(round) {
  await _updateRound(round);
  if (game.settings.get(`${MODULE_ID}`, `${OPT_ENABLE_AOE_DAMAGE}`)) {
    await ResetTemplateHealthCheck();
  }
}

function _isInCombat() {
  let stat = GetStat();
  return stat;
}
