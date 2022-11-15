(global as any).deepClone = function(original, {strict=false}={}) {

  // Simple types
  if ( (typeof original !== "object") || (original === null) ) return original;

  // Arrays
  if ( original instanceof Array ) return original.map(deepClone);

  // Dates
  if ( original instanceof Date ) return new Date(original);

  // Unsupported advanced objects
  if ( original.constructor && (original.constructor !== Object) ) {
    if ( strict ) throw new Error("deepClone cannot clone advanced objects");
    return original;
  }

  // Other objects
  const clone = {};
  for ( let k of Object.keys(original) ) {
    clone[k] = deepClone(original[k]);
  }
  return clone;
}
