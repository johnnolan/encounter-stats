import { GetStat, SaveStat } from "./StatManager.js";
import Default from "./parsers/Default.js";
import BetterRollsFor5e from "./parsers/BetterRollsFor5e.js";
import MidiQol from "./parsers/MidiQol.js";
import Beyond20 from "./parsers/Beyond20.js";
import { ROLL_HOOK, ATTACK_DATA_TEMPLATE } from "./Settings.js";

export async function AddAttack(data, type, isNew = false) {
  let stat = GetStat();
  let attackData = duplicate(ATTACK_DATA_TEMPLATE);
  attackData.round = stat.round;
  let statResult;

  switch (type) {
    case ROLL_HOOK.BETTERROLLS5E:
      statResult = await BetterRollsFor5e(stat, attackData, data, isNew);
      break;
    case ROLL_HOOK.MIDI_QOL:
      statResult = await MidiQol(stat, attackData, data);
      break;
    case ROLL_HOOK.BEYOND_20:
      statResult = await Beyond20(stat, attackData, data);
      break;
    case ROLL_HOOK.DEFAULT:
      statResult = await Default(stat, attackData, data);
      break;
    default:
      return;
  }

  if (!statResult) return;
  stat = statResult.stat;
  stat.top = _getTopStats(stat);

  if (statResult.isNewAttack) {
    stat.templateHealthCheck = [];
  }

  await SaveStat(stat);
}

export async function AddCombatants(actor, tokenId) {
  const tokenImage = canvas.tokens.get(tokenId)?.data?.img;
  const combatant = actor.data;
  if (!_isValidCombatant(combatant.type)) return;

  let stat = GetStat();
  if (!stat) return;

  const newCombatants = {
    name: combatant.name,
    id: combatant._id,
    tokenId: tokenId,
    img: tokenImage ? tokenImage : combatant.img,
    type: combatant.type,
    hp: combatant.data.attributes.hp.value,
    max: combatant.data.attributes.hp.max,
    ac: combatant.data.attributes.ac.value,
    events: [],
    health: [],
    summaryList: {
      min: "0",
      max: "0",
      avg: "0",
      total: "0",
    },
  };

  if (!stat.combatants.find((f) => f.id === newCombatants.id)) {
    stat.combatants.push(newCombatants);
    await SaveStat(stat);
  }
}

function _isValidCombatant(type) {
  return type === "character" || type === "npc";
}

function _getTopStats(data) {
  let result = data.combatants.map((m) => {
    return {
      name: m.name,
      min: m.summaryList.min,
      max: m.summaryList.max,
      avg: m.summaryList.avg,
      total: m.summaryList.total,
    };
  });

  let maxDamage = result.reduce(function (max, obj) {
    return obj.total > max.total ? obj : max;
  });
  let highestAvgDamage = result.reduce(function (max, obj) {
    return obj.avg > max.avg ? obj : max;
  });
  let highestMaxDamage = result.reduce(function (max, obj) {
    return obj.max > max.max ? obj : max;
  });

  return {
    maxDamage: `${maxDamage.name}<br />${maxDamage.total}`,
    highestAvgDamage: `${highestAvgDamage.name}<br />${highestAvgDamage.avg}`,
    highestMaxDamage: `${highestMaxDamage.name}<br />${highestMaxDamage.max}`,
  };
}
