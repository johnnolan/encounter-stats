interface MidiQolWorkflow {
  id: string;
  actor: {
    id: string;
  };
  item: MidiQolEventItem;
  attackRoll: {
    options: {
      advantageMode: number;
    };
    total: number;
  };
  damageTotal: number;
  attackTotal: number;
  workflowType: string;
  isCritical: boolean;
  isFumble: boolean;
  targets: Array<{
    id: string;
    sheet: {
      actor: {
        name: string;
        system: {
          attributes: {
            ac: {
              value: number;
            };
          };
        };
      };
    };
  }>;
  hitTargets: Array<{
    id: string;
    sheet: {
      actor: {
        name: string;
        system: {
          attributes: {
            ac: {
              value: number;
            };
          };
        };
      };
    };
  }>;
}

interface MidiQolEventItem {
  id: string;
  name: string;
  link: string;
  type: string;
  img: string;
  system: {
    actionType: string;
  };
}
