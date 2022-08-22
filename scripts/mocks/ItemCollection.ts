/* istanbul ignore file */
import Collection from "./Collection";

class ItemCollection extends Collection {
  constructor(metadata) {
    super([]);

    this.apps = [];

    /**
     * The compendium metadata which defines the compendium content and location
     * @type {object}
     */
    this.metadata = metadata;

    /**
     * A subsidiary collection which contains the more minimal index of the pack
     * @type {Collection<string, object>}
     */
    this.index = new Collection();
  }
  /** @inheritdoc */
  get(key, options) {
    this._flush();
    return super.get(key, options);
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  delete(id) {
    this.index.delete(id);
    return super.delete(id);
  }
}

export default ItemCollection;
