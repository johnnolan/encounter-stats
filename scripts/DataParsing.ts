import MidiQol from "./parsers/MidiQol";
import {
  ROLL_HOOK,
  ATTACK_DATA_TEMPLATE,
  MODULE_ID,
  OPT_TOGGLE_CAMPAIGN_TRACKING,
} from "./Settings";
import { CampaignTrackNat1, CampaignTrackNat20 } from "./CampaignManager";

export async function AddDiceRoll(data, type) {
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

export function _getTopStats(data) {
  let mostKills = 0;
  let mostHealing = 0;
  let mostSupportActions = 0;
  let mostBattlefieldActions = 0;

  mostKills = data.combatants
    .map((m) => {
      return {
        name: m.name,
        total: m.kills.length,
      };
    })
    .reduce(function (max, obj) {
      return obj.total > max.total ? obj : max;
    });

  mostHealing = data.combatants
    .map((m) => {
      return {
        name: m.name,
        total: m.events.filter((f) => {
          return f.actionType === "heal";
        }).length,
      };
    })
    .reduce(function (max, obj) {
      return obj.total > max.total ? obj : max;
    });

  mostSupportActions = data.combatants
    .map((m) => {
      return {
        name: m.name,
        total: m.events.filter((f) => {
          return f.actionType === "save" || f.actionType === "heal";
        }).length,
      };
    })
    .reduce(function (max, obj) {
      return obj.total > max.total ? obj : max;
    });

  mostBattlefieldActions = data.combatants
    .map((m) => {
      return {
        name: m.name,
        total: m.events.filter((f) => {
          return f.actionType === "other";
        }).length,
      };
    })
    .reduce(function (max, obj) {
      return obj.total > max.total ? obj : max;
    });

  let mostDamageInOneTurn = data.combatants.map((m) => {
    if (m.roundSummary.totals.length === 0) {
      return {
        name: "None",
        details: 0,
      };
    }
    return {
      name: m.name,
      details: m.roundSummary.totals.reduce(function (max, obj) {
        return obj.damageTotal > max.damageTotal ? obj : max;
      }),
    };
  });
  mostDamageInOneTurn = mostDamageInOneTurn.reduce((a, b) =>
    a.details.damageTotal > b.details.damageTotal ? a : b
  );

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
    mostDamageInOneTurn: `${mostDamageInOneTurn.name}<br />${mostDamageInOneTurn.details.damageTotal}`,
    highestAvgDamage: `${highestAvgDamage.name}<br />${highestAvgDamage.avg}`,
    highestMaxDamage: `${highestMaxDamage.name}<br />${highestMaxDamage.max}`,
    mostKills: `${mostKills.name}<br />${mostKills.total}`,
    mostHealing: `${mostHealing.name}<br />${mostHealing.total}`,
    mostSupportActions: `${mostSupportActions.name}<br />${mostSupportActions.total}`,
    mostBattlefieldActions: `${mostBattlefieldActions.name}<br />${mostBattlefieldActions.total}`,
  };
}
