import { HookDND5eActor } from "./dnd5e.actor";

export const HookDND5eUseItem: Item = {
  id: "C3c6l9SPMCqMiceV",
  name: "Fire Bolt",
  type: "spell",
  img: "systems/dnd5e/icons/spells/beam-orange-2.jpg",
  actor: HookDND5eActor,
  sort: 0,
  link: "@UUID[Actor.7KWt35CYuQyQMnsh.Item.C3c6l9SPMCqMiceV]{Fire Bolt}",
  flags: {},
  system: {
    description: {
      value:
        "<p>You hurl a mote of fire at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 fire damage. A flammable object hit by this spell ignites if it isn't being worn or carried.</p>\n<p>This spell's damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10).</p>",
      chat: "",
      unidentified: "",
    },
    source: "Basic Rules, Player's Handbook pg 242",
    activation: {
      type: "action",
      cost: 1,
      condition: "",
    },
    duration: {
      value: null,
      units: "inst",
    },
    target: {
      value: 1,
      width: null,
      units: "",
      type: "creature",
    },
    range: {
      value: 120,
      long: null,
      units: "ft",
    },
    uses: {
      value: null,
      max: "",
      per: "",
    },
    consume: {
      type: "",
      target: "",
      amount: null,
    },
    ability: "",
    actionType: "rsak",
    attackBonus: "0",
    chatFlavor: "",
    critical: {
      threshold: null,
      damage: "",
    },
    damage: {
      parts: [["1d10[fire]", "fire"]],
      versatile: "",
    },
    formula: "",
    save: {
      ability: "",
      dc: null,
      scaling: "spell",
    },
    level: 0,
    school: "evo",
    components: {
      value: "",
      vocal: true,
      somatic: true,
      material: false,
      ritual: false,
      concentration: false,
    },
    materials: {
      value: "",
      consumed: false,
      cost: 0,
      supply: 0,
    },
    preparation: {
      mode: "always",
      prepared: false,
    },
    scaling: {
      mode: "cantrip",
      formula: "1d10",
    },
  },
  ownership: {
    default: 0,
    PF6CvSHT1uM3sXqi: 3,
  },
  _stats: {
    systemId: "dnd5e",
    systemVersion: "2.0.0-alpha2",
    coreVersion: "10.278",
    createdTime: null,
    modifiedTime: 1661201905851,
    lastModifiedBy: "PYXkZMgiOGHqXnQj",
  },
};
