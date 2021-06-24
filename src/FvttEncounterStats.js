import { CreateJournal } from "./Journal.js";
import { AddCombatants, AddAttack } from "./DataParsing.js";
import UpdateHealth from "./parsers/UpdateHealth.js";
import { ROLL_HOOK } from "./Settings.js";
import { GetStat, SaveStat, RemoveStat } from "./StatManager.js";

async function _createCombat(data) {
  const encounterId = data.data._id;
  if (!encounterId) return "";
  let stat = {
    encounterId: encounterId,
    round: 1,
    combatants: [],
    top: {
      maxDamage: "",
      highestAvgDamage: "",
      highestMaxDamage: "",
    },
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

function isTokenInside(template, token, wallsBlockTargeting) {
  const grid = canvas.scene.data.grid,
    templatePos = { x: template.data.x, y: template.data.y };
  // Check for center of  each square the token uses.
  // e.g. for large tokens all 4 squares
  const startX = token.width >= 1 ? 0.5 : token.width / 2;
  const startY = token.height >= 1 ? 0.5 : token.height / 2;
  // console.error(grid, templatePos, startX, startY, token.width, token.height, token)
  for (let x = startX; x < token.width; x++) {
    for (let y = startY; y < token.height; y++) {
      const currGrid = {
        x: token.x + x * grid - templatePos.x,
        y: token.y + y * grid - templatePos.y,
      };
      let contains = template.shape?.contains(currGrid.x, currGrid.y);
      if (contains && wallsBlockTargeting) {
        const r = new Ray(
          { x: currGrid.x + templatePos.x, y: currGrid.y + templatePos.y },
          templatePos
        );
        contains = !canvas.walls.checkCollision(r);
      }
      if (contains) return true;
    }
  }
  return false;
}

function templateTokens(template) {
  const tokens = canvas.tokens.placeables.map((t) => t.data);
  let targets = [];
  let tokenInside = isTokenInside;
  for (const tokenData of tokens) {
    if (tokenInside(template, tokenData, true)) {
      console.debug("fvtt-enc tokenData", tokenData);
      targets.push(tokenData._id);
    }
  }
  console.debug("fvtt-enc targets", targets);
  //game.user.updateTokenTargets(targets);
}
async function targetsHit(measuredTemplateData) {
  console.debug("fvtt-enc measuredTemplateData", measuredTemplateData);

  templateTokens(measuredTemplateData._object);
}

export async function OnCreateMeasuredTemplate(data) {
  await targetsHit(data);
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

export async function OnUpdateCombat(round) {
  _updateRound(round);
}

function _isInCombat() {
  let stat = GetStat();
  return stat;
}
