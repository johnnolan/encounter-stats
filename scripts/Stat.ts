import { Encounter, EncounterCombatant } from "./types/globals";

export default class Stat {
  _encounter: Encounter;

  constructor(encounter: Encounter) {
    this._encounter = encounter;
  }

  get encounter(): Encounter {
    return this._encounter;
  }

  get hasEncounter(): boolean {
    return this._encounter !== undefined;
  }

  set addCombatant(combatant: EncounterCombatant) {
    if (this.encounter.combatants.find((f) => f.id === combatant.id)) {
      this._encounter.combatants.push(combatant);
      //await SaveStat(stat);
    }
  }

  get valid(): boolean {
    const isValid = false;

    return isValid;
  }

  get LoadFromJson(): Encounter {
    return this._encounter;
  }

  get toJson(): string {
    return JSON.stringify(this._encounter);
  }
}
