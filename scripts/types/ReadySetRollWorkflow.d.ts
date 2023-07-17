interface ReadySetRollWorkflow {
  messageId: string;
  itemId: string;
  actorId: string;
  tokenId: string;
  actor: {
    id: string;
  };
  item: ReadySetRollEventItem;
  params: {
    hasAdvantage: boolean;
    hasDisadvantage: boolean;
    isCrit: boolean;
    isFumble: boolean;
    isMultiRoll: boolean;
    isAltRoll: boolean;
    elvenAccuracy: boolean;
    slotLevel: number;
    spellLevel: number;
  };
  fields: [
    [
      header: {
        title: string;
        slotLevel: number;
      },
    ],
    [
      description: {
        content: string;
      },
    ],
    [
      blank: {
        display: boolean;
      },
    ],
    [
      attack: {
        roll: {
          total: number;
        };
      },
    ],
    [
      damage: {
        baseRoll: {
          total: number;
        };
      },
    ],
  ];
  processed: boolean;
  messageId: string;
}

interface ReadySetRollEventItem {
  id: string;
  name: string;
  link: string;
  type: string;
  img: string;
  system: {
    actionType: string;
  };
}

interface ReadySetRollRollData {
  attackData: unknown;
  damageData: unknown;
}
