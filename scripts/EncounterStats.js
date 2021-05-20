export default class EncounterStats {
  // Hook onto createCombat, deleteCombat,
  // midi-qol.AttackRollComplete
  // midi-qol.RollComplete

  // Only run if GM user
  // Where does the combat stats get stored as JSON?
  //1. Capture the start of combat
  //2. Record token id
  //3. Each attack record against the user
  //4. Each hit record against the user
  //5. Capture the end of combat
  //6. Create Compendium of fight history

  // Contructor
  constructor(hooksEnabled = true) {
    this.encounterStats = [];
    if (hooksEnabled) this._setupHooks();
  }

  getEncounterStats() {
    return this.encounterStats;
  }

  _getItemFromLocalStorage() {
    return JSON.parse(window.localStorage.getItem("encounterstats"));
  }

  _saveToLocalStorage() {
    var dataString = JSON.stringify(this.encounterStats);

    window.localStorage.setItem("encounterstats", dataString);
  }

  _truncateLocalStorage() {
    window.localStorage.removeItem("encounterstats");
  }

  _updateCombat(data) {
    this._truncateLocalStorage();
    const newRound = {
        round: data.round,
        events: []
    };
    this.encounterStats[0].rounds.unshift(newRound)

    this._saveToLocalStorage();
  }

  _createCombat(data) {
    this._truncateLocalStorage();

    let encounter = {
      encounterId: data._id,
      sceneId: data.scene,
      timestamp: "",
      combatants: [...this._cleanseCombatants(data.combatants)],
      rounds: [{
          round: data.round,
          events: []
      }],
    };
    this.encounterStats.push(encounter);

    this._saveToLocalStorage();
  }

  _cleanseCombatants(combatants) {
    const newCombatants = combatants.map((combatant) => ({
      name: combatant.name,
      id: combatant._id,
      img: combatant.img,
      actor: {
          id: combatant.actor._id,
          hp: combatant.actor.data.attributes.hp.value,
          max: combatant.actor.data.attributes.hp.max,
          ac: combatant.actor.data.attributes.ac.value,
      }
    }));
    return newCombatants;
  }

  _addEventToEncounter(event) {
      this.encounterStats[0].rounds[0].events.push(event);
    this._saveToLocalStorage();
  }

  _trackAttack(data) {
    const event = {
      itemId: data.itemId,
      uuid: data.uuid,
      tokenId: data.tokenId,
      advantage: data.advantage,
      isCritical: data.isCritical,
      isFumble: data.isFumble,
      disadvantage: data.disadvantage,
      damageDetail: data.damageDetail,
      attackTotal: data.attackTotal,
      attackRoll: data.attackRoll,
      damageTotal: data.damageTotal,
      actor: {
        id: data.actor._id,
        type: data.actor.type,
        hp: data.actor.data.attributes.hp.value,
        max: data.actor.data.attributes.hp.max,
      },
      item: {
          id: data.item._id,
          name: data.item.name,
          type: data.item.type,
      }
    };
    this._addEventToEncounter(event);
  }

  // Function
  _setupHooks() {
    const _this = this;
    window.Hooks.on("createCombat", async function (arg1, arg2, arg3) {
      _this._createCombat(arg1);
      console.debug("fvtt-encounter-stats createCombat1", arg1);
      console.debug("fvtt-encounter-stats createCombat2", arg2);
      console.debug("fvtt-encounter-stats createCombat3", arg3);
    });
    window.Hooks.on("deleteCombat", async function (arg1, arg2, arg3) {
      console.debug("fvtt-encounter-stats deleteCombat1", arg1);
      console.debug("fvtt-encounter-stats deleteCombat2", arg2);
      console.debug("fvtt-encounter-stats deleteCombat3", arg3);
    });
    window.Hooks.on(
      "midi-qol.AttackRollComplete",
      async function (arg1, arg2, arg3) {
          this._trackAttack(arg1);
        console.debug(
          "fvtt-encounter-stats midi-qol.AttackRollComplete1",
          arg1
        );
        console.debug(
          "fvtt-encounter-stats midi-qol.AttackRollComplete2",
          arg2
        );
        console.debug(
          "fvtt-encounter-stats midi-qol.AttackRollComplete3",
          arg3
        );
      }
    );
    /*window.Hooks.once(
      "midi-qol.RollComplete",
      async function (arg1, arg2, arg3) {
        console.debug("fvtt-encounter-stats midi-qol.RollComplete1", arg1);
        console.debug("fvtt-encounter-stats midi-qol.RollComplete2", arg2);
        console.debug("fvtt-encounter-stats midi-qol.RollComplete3", arg3);
      }
    );
    window.Hooks.once(
      "midi-qol.DamageRollComplete",
      async function (arg1, arg2, arg3) {
        console.debug("fvtt-encounter-stats midi-qol.DamageRollComplete", arg1);
        console.debug("fvtt-encounter-stats midi-qol.DamageRollComplete", arg2);
        console.debug("fvtt-encounter-stats midi-qol.DamageRollComplete", arg3);
      }
    );*/
    window.Hooks.on("updateCombat", async function (arg1, arg2, arg3) {
      console.debug("fvtt-encounter-stats updateCombat1", arg1);
      console.debug("fvtt-encounter-stats updateCombat2", arg2);
      this._updateCombat(arg2);
      console.debug("fvtt-encounter-stats updateCombat3", arg3);
    });
  }
}
