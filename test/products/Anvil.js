import Product from './Product';

/**
 * Anvil SKU
 *
 * Namespace is inherited from index `acme` namespace
 *
 * @extends acme.Product
 */
class Anvil extends Product {
  /**
   * Create an anvil
   * @param {number} weight - Weight in kg
   */
  constructor(weight) {
    super();
    /**
     * Weight in kg
     * @type {number}
     */
    this.weight = weight;
  }

  /**
   * Drop the anvil after a delay
   * @param {number} delay - Delay in ms before gravity kicks in
   */
  dropAfter(delay) {}
}

export default Anvil;
