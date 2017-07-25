import Product from './Product';

/**
 * Boomerang SKU
 *
 * Namespace is inherited from index `acme` namespace
 *
 * @extends acme.Product
 */
class Boomerang extends Product {
  /**
   * Create a boomerang
   * @param {string} material - Wood, plastic, etc.
   */
  constructor(material) {
    super();
    /**
     * Wood, plastic, etc.
     * @type {string}
     */
    this.material = material;
  }

  /**
   * Throw the boomerang at an angle
   * @param {number} angle - Angle in degrees
   */
  throwAt(angle) {}
}

export default Boomerang;
