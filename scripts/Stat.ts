import StatManager from "./StatManager";
import { ChatMessageType, CombatantType } from "./enums";

export default class Stat {
  _encounter: Encounter;

  constructor(encounterId?: string) {
    if (encounterId) {
      this._encounter = {
        encounterId: encounterId,
        round: 1,
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
      };
    } else {
      this._encounter = StatManager.GetStat();
    }
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

  AddKill(targetName: string, tokenId: string) {
    const killData = <CombatantKills>{};

    const combatantStat = this.GetCombatantStatsByTokenId(tokenId);
    if (!combatantStat) return;

    killData.round = this.currentRound;
    killData.tokenName = targetName;

    combatantStat.kills.push(killData);
  }

  UpdateHealth(actor: Actor) {
    const healthData = <CombatantHealthData>{};

    const combatantStat = this.GetCombatantStats(actor.id);
    if (!combatantStat) return;

    healthData.round = this.currentRound;
    healthData.actorId = actor?.id ?? "";
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

  AddAttack(workflow: EncounterWorkflow) {
    if (!workflow?.actor?.id) {
      return;
    }
    const combatantStat: EncounterCombatant | undefined =
      this.GetCombatantStats(workflow.actor.id);
    if (!combatantStat) return;

    // Get any existing event, if so merge object and update
    const isExistingEvent: boolean =
      combatantStat.events.find(
        (f) => f.id === workflow.id && f.round === this.currentRound
      ) !== undefined;

    if (isExistingEvent && workflow.type !== ChatMessageType.ItemCard) {
      const newCombatantEvent = combatantStat.events
        .filter((f) => f.id === workflow.id)
        .reverse()[0];

      if (workflow.type === ChatMessageType.Damage) {
        newCombatantEvent.damageTotal = workflow.damageTotal;
      } else if (workflow.type === ChatMessageType.Attack) {
        newCombatantEvent.attackTotal = workflow.attackTotal;
        newCombatantEvent.isCritical = workflow.isCritical;
        newCombatantEvent.isFumble = workflow.isFumble;
        newCombatantEvent.advantage = workflow.advantage;
        newCombatantEvent.disadvantage = workflow.disadvantage;
      }
    } else {
      if (workflow.type === ChatMessageType.ItemCard) {
        const newCombatantEvent = <CombatantEvent>{
          id: workflow.id,
          actorId: workflow.actor.id,
          item: workflow.item,
          round: this.currentRound,
          attackTotal: 0,
          damageTotal: 0,
        };
        combatantStat.events.push(newCombatantEvent);
      } else if (workflow.type === ChatMessageType.MidiQol) {
        const newCombatantEvent = <CombatantEvent>{
          id: workflow.id,
          actorId: workflow.actor.id,
          item: workflow.item,
          advantage: workflow.advantage,
          disadvantage: workflow.disadvantage,
          actionType: workflow.actionType,
          round: this.currentRound,
          enemyHit: workflow.enemyHit,
          attackTotal: 0,
          damageTotal: 0,
          isCritical: false,
        };

        if (this.IsValidAttack(newCombatantEvent.actionType)) {
          if (workflow.attackRoll) {
            newCombatantEvent.attackTotal = workflow.attackTotal;
          }
        }
        if (this.IsValidRollEvent(newCombatantEvent.actionType)) {
          if (workflow.damageRoll) {
            newCombatantEvent.damageTotal = workflow.damageTotal;
            newCombatantEvent.isCritical = workflow.isCritical;
          }
        }
        combatantStat.events.push(newCombatantEvent);
      }
    }
  }

  AddCombatant(actor: Actor, tokenId: string) {
    const tokenImage = canvas.tokens.get(tokenId)?.img;
    if (!this.IsValidCombatant(actor?.type)) return;

    if (this.IsNPC(actor?.type)) return;

    const newCombatant: EncounterCombatant = {
      name: actor.name,
      id: actor.id,
      tokenId: tokenId,
      img: tokenImage ? tokenImage : actor.img,
      type: actor.type,
      hp: actor.system.attributes.hp.value,
      max: actor.system.attributes.hp.max,
      ac: actor.system.attributes.ac.value,
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

    if (!this._encounter.combatants.find((f) => f.id === newCombatant.id)) {
      this._encounter.combatants.push(newCombatant);
    }
  }

  IsValidAttack(attackType: string) {
    const validTypes = ["mwak", "rwak", "msak", "rsak", "save"];

    return validTypes.indexOf(attackType) > -1;
  }

  IsHealingSpell(attackType: string) {
    const validTypes = ["heal"];

    return validTypes.indexOf(attackType) > -1;
  }

  IsValidCombatant(type: string): boolean {
    return type === CombatantType.Character || type === CombatantType.NPC;
  }

  IsNPC(type: string): boolean {
    return type === CombatantType.NPC;
  }

  UpdateRound(currentRound: number) {
    if (this._encounter.round !== currentRound) {
      this._encounter.round = currentRound;
    }
  }

  GetCombatantStats(actorId: string): EncounterCombatant | undefined {
    return this._encounter.combatants.find((f) => f.id === actorId);
  }

  GetCombatantStatsByTokenId(tokenId: string): EncounterCombatant | undefined {
    return this._encounter.combatants.find((f) => f.tokenId === tokenId);
  }

  async Save(): Promise<void> {
    this.GenerateCombatantStats();
    this.GetTopStats();
    await StatManager.SaveStat(this._encounter);
  }

  Delete(): void {
    StatManager.RemoveStat();
  }

  private SetTopEncounter(top: EncounterTop) {
    this._encounter.top = top;
  }

  private IsValidRollEvent(attackType: string) {
    const validTypes = ["mwak", "rwak", "msak", "rsak", "save", "heal"];

    return validTypes.indexOf(attackType) > -1;
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
