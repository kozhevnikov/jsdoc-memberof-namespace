/**
 * Base product
 *
 * Namespace is inherited from index `acme` namespace
 *
 * @abstract
 * @protected
 */
class Product {
  /**
   * Add product to basket
   * @param {number} [quantity] - Number of products
   */
  buy(quantity = 1) {}
}

export default Product;
