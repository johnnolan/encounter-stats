import { HookDND5eActor } from "./dnd5e.actor";
import { HookDND5e_rollAttack_d20roll } from "./dnd5e.rollAttack.d20roll";

export const HookPF2eChatMessageDamage: ChatMessage = {
  actor: HookDND5eActor,
  user: "Yr3UhrH9alkDRmUC",
  type: 5,
  content: "18",
  flavor: "<h4 class=\"action\">Melee Strike: Blackaxe</h4><div class=\"target-dc-result\">\n    <div class=\"target-dc\"><span data-visibility=\"all\" data-whose=\"target\">Target: Aasimar Redeemer</span> <span data-visibility=\"gm\" data-whose=\"target\">(AC 23)</span></div>\n    <div class=\"result degree-of-success\">Result: <span data-visibility=\"all\" data-whose=\"self\" class=\"failure\">Miss</span> <span data-visibility=\"gm\" data-whose=\"target\">by -5</span></div>\n</div><div class=\"tags\"><span class=\"tag\" data-slug=\"attack\" data-description=\"PF2E.TraitDescriptionAttack\">Attack</span><hr class=\"vr\" /><span class=\"tag tag_alt\" data-slug=\"artifact\" data-description=\"PF2E.TraitDescriptionArtifact\">Artifact</span><span class=\"tag tag_alt\" data-slug=\"cursed\" data-description=\"PF2E.TraitDescriptionCursed\">Cursed</span><span class=\"tag tag_alt\" data-slug=\"evocation\" data-description=\"PF2E.TraitDescriptionEvocation\">Evocation</span><span class=\"tag tag_alt\" data-slug=\"magical\" data-description=\"PF2E.TraitDescriptionMagical\">Magical</span><span class=\"tag tag_alt\" data-slug=\"primal\" data-description=\"PF2E.TraitDescriptionPrimal\">Primal</span><span class=\"tag tag_alt\" data-slug=\"sweep\" data-description=\"PF2E.TraitDescriptionSweep\">Sweep</span></div><hr /><div class=\"tags\"><span class=\"tag tag_transparent\" data-slug=\"trained\">Trained +12</span><span class=\"tag tag_transparent\" data-slug=\"str\">Strength -1</span><span class=\"tag tag_transparent\" data-slug=\"potency-rune\">Potency Rune +4</span></div>",
  flags: {
    pf2e: {
      context: {
        type: "attack-roll",
        actor: "ZDSpuPoUdPdjfCxt"
      },
      modifierName: "Melee Strike: Blackaxe"
    }
  },
  rolls:
  {
    class: "D20Roll",
    options: {
      flavor: "Fire Bolt - Damage Roll",
      advantageMode: 1,
      defaultRollMode: "publicroll",
      rollMode: "publicroll",
      critical: true,
      fumble: 1,
      halflingLucky: false,
      configured: true,
    },
    formula: "2d20kh + 0 + 2 + 4",
    terms: [
      {
        class: "Die",
        options: {
          critical: 20,
          fumble: 1,
          advantage: true,
        },
        evaluated: true,
        number: 2,
        faces: 20,
        modifiers: ["kh"],
        results: [
          {
            result: 3,
            active: false,
            discarded: true,
          },
          {
            result: 14,
            active: true,
          },
        ],
      },
    ],
    total: 20,
    evaluated: true,
    dice: [
      {
        total: 20
      }
    ]
  },
  item: {
    id: "C3c6l9SPMCqMiceV",
    name: "Fire Bolt",
    type: "spell",
    img: "systems/dnd5e/icons/spells/beam-orange-2.jpg",
    link: "@UUID[Actor.7KWt35CYuQyQMnsh.Item.C3c6l9SPMCqMiceV]{Fire Bolt}",
  }
};
