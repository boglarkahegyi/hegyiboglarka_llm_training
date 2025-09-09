/**
 * Product utility functions for stock management and validation
 */

/**
 * Check if a product is out of stock
 * @param {Object} product - The product object
 * @returns {boolean} - True if product is out of stock (exactly 0 stock)
 */
export const isOutOfStock = (product) => {
  return product && product.stock === 0;
};

/**
 * Check if a product has exactly zero stock (alias for isOutOfStock for backward compatibility)
 * @param {Object} product - The product object
 * @returns {boolean} - True if product has exactly zero stock
 */
export const hasZeroStock = (product) => {
  return isOutOfStock(product);
};

/**
 * Get appropriate tooltip message for stock status
 * @param {Object} product - The product object
 * @param {string} inStockMessage - Message to show when in stock
 * @param {string} outOfStockMessage - Message to show when out of stock
 * @returns {string} - Appropriate tooltip message
 */
export const getStockTooltip = (product, inStockMessage = "Add to cart", outOfStockMessage = "Out of stock") => {
  return isOutOfStock(product) ? outOfStockMessage : inStockMessage;
};

/**
 * Find a product by ID from a products array
 * @param {Array} products - Array of products
 * @param {number} productId - The product ID to find
 * @returns {Object|undefined} - The found product or undefined
 */
export const findProductById = (products, productId) => {
  return products.find(p => p.id === productId);
};
