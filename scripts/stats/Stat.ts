import StatManager from "../StatManager";
import {
  CombatantType,
  ValidAttacks,
  ValidHeals,
  ValidRollEvent,
} from "../enums";
import Logger from "../Helpers/Logger";
import Dates from "../Helpers/Dates";

export default class Stat {
  _encounter: Encounter;

  constructor(encounterId?: string) {
    if (encounterId) {
      const date = Dates.now.dateTimeDisplay;
      this._encounter = {
        encounterId: encounterId,
        round: 1,
        overview: {
          start: date,
          end: "",
          realDate: date,
          scene: {
            id: "",
            name: "",
            thumb: "",
          },
        },
        enemies: [],
        combatants: [],
        top: {
          maxDamage: "",
          mostDamageInOneTurn: "",
          highestAvgDamage: "",
          highestMaxDamage: "",
          mostKills: "",
          mostHealing: "",
          mostSupportActions: "",
          mostBattlefieldActions: ",",
        },
        templateHealthCheck: [],
        partySummary: {
          averageDamagePerRound: 0,
          lowestDamagePerRound: 0,
          highestDamagePerRound: 0,
          totalDamage: 0,
          totalDamagePerRound: [],
        },
      };
    }
  }

  set encounter(encounter) {
    this._encounter = encounter;
  }

  get encounter(): Encounter {
    return this._encounter;
  }

  get hasEncounter(): boolean {
    return this._encounter !== undefined;
  }

  get currentRound(): number {
    return this._encounter.round;
  }

  UpdateEnd() {
    if (!this._encounter?.overview) return;
    this._encounter.overview.end = Dates.now.dateTimeDisplay;
  }

  AddKill(targetName: string, tokenId: string) {
    const killData = <CombatantKills>{};

    const combatantStat = this.GetCombatantStatsByTokenId(tokenId);
    if (!combatantStat) {
      Logger.warn(
        `No combatant statistics for TokenID ${tokenId}`,
        "stat.AddKill",
        tokenId
      );
      return;
    }

    killData.round = this.currentRound;
    killData.tokenName = targetName;

    combatantStat.kills.push(killData);
  }

  UpdateHealth(actor: Actor) {
    const healthData = <CombatantHealthData>{};
    if (!actor.id) {
      Logger.warn(`No Actor ID passed`, "stat.UpdateHealth", actor);
      return;
    }

    const combatantStat = this.GetCombatantStats(actor.id);
    if (!combatantStat) {
      Logger.warn(
        `No combatant statistics for TokenID ${actor.id}`,
        "stat.UpdateHealth",
        actor
      );
      return;
    }
    healthData.round = this.currentRound;
    healthData.actorId = actor?.id;
    healthData.max = actor.system.attributes.hp.max;
    healthData.current = actor.system.attributes.hp.value;

    if (combatantStat.health.length > 0) {
      healthData.previous =
        combatantStat.health[combatantStat.health.length - 1].current;
    } else {
      healthData.previous = combatantStat.hp;
    }

    if (healthData.current > healthData.previous) {
      healthData.diff = healthData.current - healthData.previous;
      healthData.isheal = true;
    } else if (healthData.current < healthData.previous) {
      healthData.diff = healthData.previous - healthData.current;
      healthData.isdamage = true;
    }
    combatantStat.health.push(healthData);
  }

  AddEnemy(enemy: Enemies) {
    this._encounter.enemies.push(enemy);
  }

  async AddCombatant(actor: Actor, tokenId: string, initiative: number | null) {
    if (!actor || !actor.id || !actor.name) {
      Logger.warn(`No valid actor passed ${actor}`, "stat.AddCombatant", actor);
      return;
    }
    const tokenImage = await actor.getTokenImages();

    if (!Stat.IsValidCombatant(actor?.type)) return;

    const newCombatant: EncounterCombatant = {
      name: actor.name,
      id: actor.id,
      tokenId: tokenId,
      img: tokenImage.length > 0 ? tokenImage[0] : actor.img,
      type: actor.type,
      hp: actor.system.attributes.hp.value,
      max: actor.system.attributes.hp.max,
      ac: actor.system.attributes.ac.value,
      initiative: initiative,
      abilities: {
        cha: actor.system.abilities.cha.value,
        con: actor.system.abilities.con.value,
        dex: actor.system.abilities.dex.value,
        int: actor.system.abilities.int.value,
        str: actor.system.abilities.str.value,
        wis: actor.system.abilities.wis.value,
      },
      events: [],
      health: [],
      kills: [],
      summaryList: {
        min: 0,
        max: 0,
        avg: 0,
        total: 0,
      },
      roundSummary: {
        totals: [
          {
            round: this.currentRound,
            damageTotal: 0,
          },
        ],
      },
    };

    let currentCombatant = this._encounter.combatants.find(
      (f) => f.id === newCombatant.id
    );

    if (!currentCombatant) {
      this._encounter.combatants.push(newCombatant);
      currentCombatant = this._encounter.combatants.find(
        (f) => f.id === newCombatant.id
      );
      if (currentCombatant?.initiative) {
        this._encounter.combatants.sort((a, b) =>
          (a.initiative ?? 0) > (b.initiative ?? 0) ? 1 : -1
        );
      }
    }

    if (!currentCombatant?.initiative && newCombatant.initiative) {
      currentCombatant.initiative = newCombatant.initiative;
      this._encounter.combatants.sort((a, b) =>
        (a.initiative ?? 0) < (b.initiative ?? 0) ? 1 : -1
      );
    }
  }

  IsValidAttack(attackType: string) {
    return Object.values(ValidAttacks).includes(attackType);
  }

  IsHealingSpell(attackType: string) {
    return Object.values(ValidHeals).includes(attackType);
  }

  static IsValidCombatant(type: string): boolean {
    return type === CombatantType.Character;
  }

  protected IsValidRollEvent(attackType: string) {
    return Object.values(ValidRollEvent).includes(attackType);
  }

  public UpdateScene(id: string, name: string, thumb: string) {
    if (!this._encounter?.overview?.scene) return;
    this._encounter.overview.scene.name = name;
    this._encounter.overview.scene.thumb = thumb;
    this._encounter.overview.scene.id = id;
  }

  public UpdateRound(currentRound: number) {
    if (this._encounter.round !== currentRound) {
      this._encounter.round = currentRound;
    }
  }

  GetCombatantStats(actorId: string): EncounterCombatant | undefined {
    return this._encounter?.combatants?.find((f) => f.id === actorId);
  }

  GetCombatantStatsByTokenId(tokenId: string): EncounterCombatant | undefined {
    return this._encounter.combatants.find((f) => f.tokenId === tokenId);
  }

  async Save(): Promise<void> {
    if (!this._encounter?.combatants) return;
    this.GenerateCombatantStats();
    this.GetTopStats();
    this._partySummary(this._encounter);
    await StatManager.SaveStat(this._encounter);
  }

  private SetTopEncounter(top: EncounterTop) {
    this._encounter.top = top;
  }

  private _setPartySummary(partyStats: PartyEncounterStats) {
    this._encounter.partySummary = partyStats;
  }

  private GenerateCombatantStats(): void {
    this._encounter.combatants.forEach((combatantStat) => {
      const combatantAttacks = combatantStat.events.filter((f) => {
        return this.IsValidAttack(f.actionType);
      });

      const combatantTotalDamage: Array<number> = combatantAttacks.map((m) => {
        return m.damageTotal ?? 0;
      });

      combatantStat.summaryList =
        this.GetSummaryStatsFromArray(combatantTotalDamage);

      const combatantTotalDamagePerRound = combatantAttacks.map((m) => {
        return <EncounterRoundTotal>{
          round: m.round,
          damageTotal: m.damageTotal ?? 0,
        };
      });

      combatantStat.roundSummary = this.GetRoundSummaryStats(
        combatantTotalDamagePerRound
      );
    });
  }

  private GetRoundSummaryStats(
    encounterRoundTotals: Array<EncounterRoundTotal>
  ) {
    const individual = this.GroupBy(encounterRoundTotals, "round");
    const rounds = <EncounterRoundSummary>{
      totals: [],
    };
    for (const round in individual) {
      rounds.totals.push(<EncounterRoundTotal>{
        round: parseInt(round),
        damageTotal: individual[round]
          .map((m) => {
            return m.damageTotal ?? 0;
          })
          .reduce(this.AddAccumulator, 0),
      });
    }

    return rounds;
  }

  private GetSummaryStatsFromArray(
    combatantTotalDamage: Array<number>
  ): CombatantEventSummaryList {
    if (combatantTotalDamage.length === 0) {
      return {
        min: 0,
        max: 0,
        avg: 0,
        total: 0,
      };
    }

    return <CombatantEventSummaryList>{
      min: Math.min(...combatantTotalDamage),
      max: Math.max(...combatantTotalDamage),
      avg: Math.round(
        combatantTotalDamage.reduce(this.AddAccumulator, 0) /
          combatantTotalDamage.length
      ),
      total: combatantTotalDamage.reduce(this.AddAccumulator, 0),
    };
  }

  private GetTopStats(): void {
    if (this._encounter.combatants.length === 0) {
      this.SetTopEncounter({
        maxDamage: "",
        mostDamageInOneTurn: "",
        highestAvgDamage: "",
        highestMaxDamage: "",
        mostKills: "",
        mostHealing: "",
        mostSupportActions: "",
        mostBattlefieldActions: "",
      });
      return;
    }

    const mostKills = this._encounter.combatants
      .map((m) => {
        if (m.kills.length === 0) {
          return {
            name: "None",
            total: 0,
          };
        }
        return {
          name: m.name,
          total: m.kills.length,
        };
      })
      .reduce(function (max, obj) {
        return obj.total > max.total ? obj : max;
      });

    const mostHealing = this._encounter.combatants
      .map((m) => {
        if (m.events.length === 0) {
          return {
            name: "None",
            total: 0,
          };
        }
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

    const mostSupportActions = this._encounter.combatants
      .map((m) => {
        if (m.events.length === 0) {
          return {
            name: "None",
            total: 0,
          };
        }
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

    const mostBattlefieldActions = this._encounter.combatants
      .map((m) => {
        if (m.events.length === 0) {
          return {
            name: "None",
            total: 0,
          };
        }
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

    const mostDamageInOneTurn = this._encounter.combatants
      .map((m) => {
        if (m.roundSummary.totals.length === 0) {
          return {
            name: "None",
            total: 0,
          };
        }
        return {
          name: m.name,
          total: m.roundSummary.totals.reduce(function (max, obj) {
            return obj.damageTotal > max.damageTotal ? obj : max;
          }).damageTotal,
        };
      })
      .reduce((a, b) => (a.total > b.total ? a : b));

    const result = this._encounter.combatants.map((m) => {
      if (m.summaryList.total === 0) {
        return {
          name: "None",
          min: 0,
          max: 0,
          avg: 0,
          total: 0,
        };
      }
      return {
        name: m.name,
        min: m.summaryList.min,
        max: m.summaryList.max,
        avg: m.summaryList.avg,
        total: m.summaryList.total,
      };
    });

    const maxDamage = result.reduce(function (max, obj) {
      return obj.total > max.total ? obj : max;
    });
    const highestAvgDamage = result.reduce(function (max, obj) {
      return obj.avg > max.avg ? obj : max;
    });
    const highestMaxDamage = result.reduce(function (max, obj) {
      return obj.max > max.max ? obj : max;
    });

    this.SetTopEncounter({
      maxDamage: `${maxDamage.name}<br />${maxDamage.total}`,
      mostDamageInOneTurn: `${mostDamageInOneTurn.name}<br />${mostDamageInOneTurn.total}`,
      highestAvgDamage: `${highestAvgDamage.name}<br />${highestAvgDamage.avg}`,
      highestMaxDamage: `${highestMaxDamage.name}<br />${highestMaxDamage.max}`,
      mostKills: `${mostKills.name}<br />${mostKills.total}`,
      mostHealing: `${mostHealing.name}<br />${mostHealing.total}`,
      mostSupportActions: `${mostSupportActions.name}<br />${mostSupportActions.total}`,
      mostBattlefieldActions: `${mostBattlefieldActions.name}<br />${mostBattlefieldActions.total}`,
    });
  }

  private _partySummary(encounter: Encounter): PartyEncounterStats | void {
    if (encounter.combatants.length === 0) {
      return;
    }
    const result = encounter.combatants
      .filter((f) => f.type === "character")
      .map((m) => {
        return {
          totals: m.roundSummary.totals,
        };
      })
      .reduce((a, b) => {
        return {
          totals: a.totals?.concat(b.totals) ?? {},
        };
      });

    let totalDamage = 0;
    const totalDamagePerRound: Array<EncounterRoundTotal> = [];
    if (result?.totals.length > 0) {
      totalDamage =
        result.totals.reduce((accu, item) => accu + item.damageTotal, 0) ?? 0;

      result.totals.reduce(function (res, value) {
        if (!res[value.round]) {
          res[value.round] = { round: value.round, damageTotal: 0 };
          totalDamagePerRound.push(res[value.round]);
        }
        res[value.round].damageTotal += value.damageTotal;
        return res;
      }, {});
    }

    let averageDamagePerRound = 0;
    let lowestDamagePerRound = 0;
    let highestDamagePerRound = 0;
    if (totalDamagePerRound.length > 0) {
      averageDamagePerRound = totalDamage / totalDamagePerRound.length;
      lowestDamagePerRound =
        totalDamagePerRound?.reduce(function (previousValue, currentValue) {
          return currentValue.damageTotal < previousValue.damageTotal
            ? currentValue
            : previousValue;
        }).damageTotal ?? 0;
      highestDamagePerRound =
        totalDamagePerRound?.reduce(function (previousValue, currentValue) {
          return currentValue.damageTotal > previousValue.damageTotal
            ? currentValue
            : previousValue;
        }).damageTotal ?? 0;
    }

    this._setPartySummary({
      averageDamagePerRound: Math.round(averageDamagePerRound),
      lowestDamagePerRound: Math.round(lowestDamagePerRound),
      highestDamagePerRound: Math.round(highestDamagePerRound),
      totalDamage: Math.round(totalDamage),
      totalDamagePerRound: totalDamagePerRound,
    });

    return {
      averageDamagePerRound: Math.round(averageDamagePerRound),
      lowestDamagePerRound: Math.round(lowestDamagePerRound),
      highestDamagePerRound: Math.round(highestDamagePerRound),
      totalDamage: Math.round(totalDamage),
      totalDamagePerRound: totalDamagePerRound,
    };
  }

  private GroupBy(xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  private AddAccumulator(accumulator: number, a: number) {
    return accumulator + a;
  }
}
