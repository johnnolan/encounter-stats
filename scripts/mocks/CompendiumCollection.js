/* istanbul ignore file */
import Collection from "./Collection.js";
import ItemCollection from "./ItemCollection.js";

class CompendiumCollection extends Collection {
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
  // Asynchronously retrieve the index
  getIndex() {
    let pack = new ItemCollection({
      name: "Flame Tongue Greatsword",
      img: "systems/dnd5e/icons/skills/fire_13.jpg",
      type: "weapon",
      _id: "WWb4vAmh18sMAxfY",
    });
    this.index.set("keyid", pack);
    return this.index;
  }
  /** @inheritdoc */
  get(key, options) {
    this._flush();
    return super.get(key, options);
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  set(id, document) {
    this._flush();
    this.indexDocument(document);
    return super.set(id, document);
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  delete(id) {
    this.index.delete(id);
    return super.delete(id);
  }
}

export default CompendiumCollection;
