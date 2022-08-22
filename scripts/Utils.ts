import { ATTACKTYPES } from "./Settings";
import { GetStat } from "./StatManager";

/*export async function ChatType(data) {
  if (data?.data?.content) {
    let match = getItemId(data.data.content);
    if (match) {
      return ATTACKTYPES.INFO;
    }
  }

  if (data._roll && data.data?.flags?.dnd5e) {
    switch (data.data.flags.dnd5e.roll.type) {
      case "attack":
        return ATTACKTYPES.ATTACK;
      case "damage":
        return ATTACKTYPES.DAMAGE;
    }
  }

  // If other forumla TODO: This will cause issues with translations
  if (data.data?.flavor?.toLowerCase().indexOf("other formula") > -1) {
    return ATTACKTYPES.DAMAGE_FORMULA;
  }
  return ATTACKTYPES.NONE;
}*/

export function IsInCombat() {
  return GetStat();
}
