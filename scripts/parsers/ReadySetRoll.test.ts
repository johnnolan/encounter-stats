import { CombatDetailType } from "../enums";
import ReadySetRoll from "./ReadySetRoll";

const readySetRollWorkflow: ReadySetRollWorkflow = {
  "_currentId": 5,
  "itemId": "C3c6l9SPMCqMiceV",
  "actorId": "5H4YnyD6zf9vcJ3P",
  "item": {
    "id": "itemId",
    "name": "Flame Tongue Greatsword",
    "link": "@Compendium[dnd5e.items.WWb4vAmh18sMAxfY]{Flame Tongue Greatsword}",
    "type": "sword",
    "img": "itemImageUrl",
    "system": {
      "actionType": "mwak"
    }
  },
  "tokenId": null,
  "params": {
      "hasAdvantage": true,
      "hasDisadvantage": false,
      "isCrit": false,
      "isFumble": false,
      "isMultiRoll": false,
      "isAltRoll": false,
      "elvenAccuracy": false,
      "slotLevel": 0,
      "spellLevel": 0
  },
  "fields": [
      [
          "header",
          {
              "title": "Fire Bolt",
              "slotLevel": 0
          }
      ],
      [
          "description",
          {
              "content": "<p>You hurl a mote of fire at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 fire damage. A flammable object hit by this spell ignites if it isn't being worn or carried.</p>\n<p>This spell's damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10).</p>",
              "isFlavor": false
          }
      ],
      [
          "blank",
          {
              "display": true
          }
      ],
      [
          "attack",
          {
              "roll": {
                  "class": "D20Roll",
                  "options": {
                      "flavor": "Fire Bolt - Attack Roll",
                      "advantageMode": 0,
                      "defaultRollMode": "publicroll",
                      "rollMode": "publicroll",
                      "critical": 20,
                      "fumble": 1,
                      "halflingLucky": false,
                      "configured": true
                  },
                  "dice": [],
                  "formula": "1d20 + 2 + 4 + 6",
                  "terms": [
                      {
                          "class": "Die",
                          "options": {
                              "critical": 20,
                              "fumble": 1
                          },
                          "evaluated": true,
                          "number": 1,
                          "faces": 20,
                          "modifiers": [],
                          "results": [
                              {
                                  "result": 8,
                                  "active": true
                              }
                          ]
                      },
                      {
                          "class": "OperatorTerm",
                          "options": {},
                          "evaluated": true,
                          "operator": "+"
                      },
                      {
                          "class": "NumericTerm",
                          "options": {},
                          "evaluated": true,
                          "number": 2
                      },
                      {
                          "class": "OperatorTerm",
                          "options": {},
                          "evaluated": true,
                          "operator": "+"
                      },
                      {
                          "class": "NumericTerm",
                          "options": {},
                          "evaluated": true,
                          "number": 4
                      },
                      {
                          "class": "OperatorTerm",
                          "options": {},
                          "evaluated": true,
                          "operator": "+"
                      },
                      {
                          "class": "NumericTerm",
                          "options": {},
                          "evaluated": true,
                          "number": 6
                      }
                  ],
                  "total": 12,
                  "evaluated": true
              },
              "rollType": "attack"
          }
      ],
      [
          "damage",
          {
              "damageType": "fire",
              "baseRoll": {
                  "class": "Roll",
                  "options": {},
                  "dice": [],
                  "formula": "3d10[fire]",
                  "terms": [
                      {
                          "class": "Die",
                          "options": {
                              "flavor": "fire",
                              "baseNumber": 3
                          },
                          "evaluated": true,
                          "number": 3,
                          "faces": 10,
                          "modifiers": [],
                          "results": [
                              {
                                  "result": 7,
                                  "active": true
                              },
                              {
                                  "result": 2,
                                  "active": true
                              },
                              {
                                  "result": 8,
                                  "active": true
                              }
                          ]
                      }
                  ],
                  "total": 21,
                  "evaluated": true
              },
              "critRoll": null,
              "versatile": false
          }
      ],
      [
          "footer",
          {
              "properties": [
                  "Cantrip",
                  "V, S",
                  "1 Action",
                  "1 Creature",
                  "120 Feet"
              ]
          }
      ]
  ],
  "templates": [
      "<header class=\"card-header flexrow rsr-header\">\r\n\t<img src=\"icons/magic/light/beam-rays-orange.webp\" title=\"Fire Bolt\" width=\"36\" height=\"36\"/>\r\n\t<h3 class=\"item-name\">Fire Bolt</h3>\r\n</header>",
      "    <div class=\"card-content br-text\"><p>You hurl a mote of fire at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 fire damage. A flammable object hit by this spell ignites if it isn't being worn or carried.</p>\n<p>This spell's damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10).</p></div>\r\n",
      "<div class=\"card-content\" style=\"display: block;\"></div>\r\n",
      "<div class=\"dice-roll rsr-dual\" data-id=\"3\" data-roll-state=\"single\" data-type=\"attack\">\r\n    <div class=\"rsr5e-roll-label\">Attack </div>\r\n    <div class=\"dice-result\">\r\n\t\t<div class=\"dice-formula dice-tooltip\">1d20 + 2 + 4 + 6</div>\r\n\t\t<div class=\"dice-row rsr-rolls\">\r\n\t\t\t<div class=\"tooltip dual-left dice-row-item\"><div class=\"dice-tooltip\">\r\n    <section class=\"tooltip-part\">\r\n        <div class=\"dice\">\r\n            <header class=\"part-header flexrow\">\r\n                <span class=\"part-formula\">1d20</span>\r\n                \r\n                <span class=\"part-total\">8</span>\r\n            </header>\r\n            <ol class=\"dice-rolls\">\r\n                <li class=\"roll die d20\">8</li>\r\n            </ol>\r\n        </div>\r\n    </section>\r\n</div>\r\n</div>\r\n\t\t</div>\r\n\t\t<div class=\"dice-row rsr-rolls\">\r\n\t\t\t<div class=\"tooltip dice-row-item\"><div class=\"dice-tooltip\">\r\n</div>\r\n</div>\r\n\t\t</div>\r\n\t\t<div class=\"dice-row rsr-totals\">\r\n\t\t\t<h4 class=\"dice-total dice-row-item rsr-base-die \">\r\n\t\t\t\t20<span class=\"die-icon \">8</span>\r\n\t\t\t</h4>\r\n\t\t</div>\r\n    </div>\r\n</div>",
      "<div class=\"dice-roll rsr-dual\" data-id=\"4\"  data-type=\"damage\">\r\n    <div class=\"rsr5e-roll-label\">Damage - Fire</div>\r\n    <div class=\"dice-result\">\r\n\t\t<div class=\"dice-formula dice-tooltip\">3d10[fire]</div>\r\n\t\t<div class=\"dice-row tooltips\">\r\n\t\t\t\t<div class=\"tooltip dual-left dice-row-item\"><div class=\"dice-tooltip\">\r\n    <section class=\"tooltip-part\">\r\n        <div class=\"dice\">\r\n            <header class=\"part-header flexrow\">\r\n                <span class=\"part-formula\">3d10</span>\r\n                <span class=\"part-flavor\">fire</span>\r\n                <span class=\"part-total\">17</span>\r\n            </header>\r\n            <ol class=\"dice-rolls\">\r\n                <li class=\"roll die d10\">7</li>\r\n                <li class=\"roll die d10\">2</li>\r\n                <li class=\"roll die d10\">8</li>\r\n            </ol>\r\n        </div>\r\n    </section>\r\n</div>\r\n</div>\r\n\t\t</div>\r\n\t\t<div class=\"dice-row\">\r\n\t\t\t<h4 class=\"dice-total dice-row-item rsr-damage\" data-damageType=\"fire\">\r\n\t\t\t\t<div class=\"rsr-base-die inline rsr-base-damage \" data-value=\"17\">17</div>\r\n\t\t\t\t\r\n\t\t\t</h4>\r\n\t\t</div>\r\n\t\t\r\n    </div>\r\n</div>\r\n",
      "<footer class=\"card-footer\">\r\n    <span>Cantrip</span>\r\n    <span>V, S</span>\r\n    <span>1 Action</span>\r\n    <span>1 Creature</span>\r\n    <span>120 Feet</span>\r\n</footer>"
  ],
  "processed": true,
  "messageId": "d75gppsau45ypm2m"
};
/*
const midiWorkflowDisadvantage: MidiQolWorkflow = {
  id: "d75gppsau45ypm2m",
  actor: {
    id: "5H4YnyD6zf9vcJ3P",
    type: "character",
  },
  isCritical: false,
  isFumble: false,
  attackRoll: {
    total: 18,
    options: {
      advantageMode: -1,
    },
  },
  workflowType: "test",
  attackTotal: 12,
  damageTotal: 21,
  item: {
    id: "itemId",
    name: "Flame Tongue Greatsword",
    link: "@Compendium[dnd5e.items.WWb4vAmh18sMAxfY]{Flame Tongue Greatsword}",
    type: "sword",
    img: "itemImageUrl",
    system: {
      actionType: "mwak",
    },
  },
  hitTargets: new Set([{}, {}]),
  targets: [
    {
      id: "tokenId",
      sheet: {
        actor: {
          name: "Acolyte",
          system: {
            attributes: {
              ac: {
                value: 10,
              },
            },
          },
        },
      },
    },
    {
      id: "tokenId2",
      sheet: {
        actor: {
          name: "Troll",
          system: {
            attributes: {
              ac: {
                value: 8,
              },
            },
          },
        },
      },
    },
  ],
};

const midiWorkflowNoDiceRoll: MidiQolWorkflow = {
  id: "d75gppsau45ypm2m",
  actor: {
    id: "5H4YnyD6zf9vcJ3P",
    type: "character",
  },
  isCritical: false,
  isFumble: false,
  workflowType: "test",
  item: {
    id: "itemId",
    name: "Flame Tongue Greatsword",
    link: "@Compendium[dnd5e.items.WWb4vAmh18sMAxfY]{Flame Tongue Greatsword}",
    type: "sword",
    img: "itemImageUrl",
    system: {
      actionType: "mwak",
    },
  },
  hitTargets: new Set([{}, {}]),
  targets: [
    {
      id: "tokenId",
      sheet: {
        actor: {
          name: "Acolyte",
          system: {
            attributes: {
              ac: {
                value: 10,
              },
            },
          },
        },
      },
    },
  ],
};

const midiWorkflowNoDiceRollNpc: MidiQolWorkflow = {
  id: "d75gppsau45ypm2m",
  actor: {
    id: "5H4YnyD6zf9vcJ3P",
    type: "npc",
  },
  isCritical: false,
  isFumble: false,
  workflowType: "test",
  item: {
    id: "itemId",
    name: "Flame Tongue Greatsword",
    link: "@Compendium[dnd5e.items.WWb4vAmh18sMAxfY]{Flame Tongue Greatsword}",
    type: "sword",
    img: "itemImageUrl",
    system: {
      actionType: "mwak",
    },
  },
  hitTargets: new Set([{}, {}]),
  targets: [
    {
      id: "tokenId",
      sheet: {
        actor: {
          name: "Acolyte",
          system: {
            attributes: {
              ac: {
                value: 10,
              },
            },
          },
        },
      },
    },
  ],
};*/

describe("ReadySetRoll", () => {
  describe("ParseWorkflow", () => {
    describe("If it has a attack and damage roll", () => {
      test("it returns the correct EncounterMidiWorkflow", async () => {
        const result: EncounterWorkflow = ReadySetRoll.ParseWorkflow(readySetRollWorkflow);
        expect(result).toStrictEqual(<EncounterWorkflow>{
          id: "d75gppsau45ypm2m",
          actionType: "mwak",
          actor: {
            id: "5H4YnyD6zf9vcJ3P",
          },
          advantage: true,
          isCritical: false,
          isFumble: false,
          disadvantage: false,
          attackTotal: 12,
          diceTotal: undefined,
          damageTotal: 21,
          item: {
            id: "itemId",
            name: "Flame Tongue Greatsword",
            link: "@Compendium[dnd5e.items.WWb4vAmh18sMAxfY]{Flame Tongue Greatsword}",
            type: "sword",
            img: "itemImageUrl",
          },
          enemyHit: [],
          type: CombatDetailType.ReadySetRoll,
        });
      });
    });
/*
    describe("If it has a attack and damage roll with disadvantage", () => {
      test("it returns the correct EncounterMidiWorkflow", async () => {
        const result: EncounterWorkflow = ReadySetRoll.ParseWorkflow(midiWorkflowDisadvantage);
        expect(result).toStrictEqual(<EncounterWorkflow>{
          id: "d75gppsau45ypm2m",
          actionType: "mwak",
          actor: {
            id: "5H4YnyD6zf9vcJ3P",
          },
          advantage: false,
          isCritical: false,
          isFumble: false,
          disadvantage: true,
          diceTotal: undefined,
          damageMultipleEnemiesTotal: 42,
          workflowType: "test",
          attackTotal: 12,
          damageTotal: 21,
          item: {
            id: "itemId",
            name: "Flame Tongue Greatsword",
            link: "@Compendium[dnd5e.items.WWb4vAmh18sMAxfY]{Flame Tongue Greatsword}",
            type: "sword",
            img: "itemImageUrl",
          },
          enemyHit: [
            {
              name: "Acolyte",
              tokenId: "tokenId",
            },
            {
              name: "Troll",
              tokenId: "tokenId2",
            },
          ],
          type: CombatDetailType.MidiQol,
        });
      });
    });

    describe("If it has no attack and damage roll", () => {
      test("it returns the correct EncounterMidiWorkflow", async () => {
        const result: EncounterWorkflow = ReadySetRoll.ParseWorkflow(
          midiWorkflowNoDiceRoll
        );
        expect(result).toStrictEqual(<EncounterWorkflow>{
          id: "d75gppsau45ypm2m",
          actionType: "mwak",
          actor: {
            id: "5H4YnyD6zf9vcJ3P",
          },
          advantage: false,
          isCritical: false,
          isFumble: false,
          diceTotal: undefined,
          disadvantage: false,
          damageMultipleEnemiesTotal: 0,
          workflowType: "test",
          attackTotal: 0,
          damageTotal: 0,
          item: {
            id: "itemId",
            name: "Flame Tongue Greatsword",
            link: "@Compendium[dnd5e.items.WWb4vAmh18sMAxfY]{Flame Tongue Greatsword}",
            type: "sword",
            img: "itemImageUrl",
          },
          enemyHit: [
            {
              name: "Acolyte",
              tokenId: "tokenId",
            },
          ],
          type: CombatDetailType.MidiQol,
        });
      });
    });
  });
*/
  describe("RollCheck", () => {
    describe("if the check contains a valid actorId", () => {
      beforeEach(() => {
        (global as any).game = {
          actors: {
            get: jest.fn().mockReturnValue({
              id: "actorId",
              name: "Actor Name",
              type: "character",
            }),
          },
        };
      });

      test("it returns the correct EncounterMidiWorkflow", async () => {
        const result = ReadySetRoll.RollCheck(readySetRollWorkflow);
        expect(result).toStrictEqual(<DiceTrackParse>{
          isCritical: false,
          isFumble: false,
          flavor: "Flame Tongue Greatsword",
          name: "Actor Name",
        });
      });
    });

    describe("if the check doesn't contain a valid actorId", () => {
      beforeEach(() => {
        (global as any).game = {
          actors: {
            get: jest.fn().mockReturnValue(undefined),
          },
        };
      });

      test("it returns the correct EncounterMidiWorkflow", async () => {
        const result = ReadySetRoll.RollCheck(readySetRollWorkflow);
        expect(result).toBeUndefined();
      });
    });
/*
    describe("if its an npc", () => {
      beforeEach(() => {
        (global as any).game = {
          actors: {
            get: jest.fn().mockReturnValue({
              id: "5H4YnyD6zf9vcJ3P",
              type: "npc",
            }),
          },
        };
      });

      test("it should return undefined", async () => {
        const result = ReadySetRoll.RollCheck(midiWorkflowNoDiceRollNpc);
        expect(result).toBeUndefined();
      });
    });*/
  });
});
