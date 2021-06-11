export function IsValidAttack(attackType) {
  const validTypes = ["mwak", "rwak", "msak", "rsak", "save"];

  return validTypes.indexOf(attackType) > -1;
}

export function IsHealingSpell(attackType) {
  const validTypes = ["heal"];

  return validTypes.indexOf(attackType) > -1;
}
