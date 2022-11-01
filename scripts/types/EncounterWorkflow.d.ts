import { CombatDetailType } from "../enums";

interface EncounterWorkflow {
  id: string;
  actor: {
    id: string;
  };
  item?: EventItem;
  damageTotal?: number;
  damageMultipleEnemiesTotal?: number;
  attackTotal?: number;
  workflowType?: string;
  advantage?: boolean;
  disadvantage?: boolean;
  isCritical?: boolean;
  isFumble?: boolean;
  actionType?: string;
  enemyHit?: Array<EnemyHit>;
  type: CombatDetailType;
}
