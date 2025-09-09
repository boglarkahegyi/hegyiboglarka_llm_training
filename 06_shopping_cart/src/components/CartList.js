import React, { useState } from 'react';
import { ShoppingCart, ChevronUp, ChevronDown, Minus, Plus, Trash2 } from 'lucide-react';
import { isOutOfStock, findProductById, getStockTooltip } from '../utils/productHelpers';

const CartList = ({ cart, onUpdateQuantity, onRemoveItem, products }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.product_price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className={`cart-list ${!isExpanded ? 'collapsed' : ''}`}>
        <div className="cart-header" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="cart-header-content">
            <ShoppingCart size={18} />
            <h4>Shopping Cart</h4>
          </div>
          {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </div>
        {isExpanded && (
          <div className="cart-empty">
            <p>Your cart is empty</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`cart-list ${!isExpanded ? 'collapsed' : ''}`}>
      <div className="cart-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="cart-header-content">
          <ShoppingCart size={18} />
          <h4>Shopping Cart ({totalItems})</h4>
        </div>
        {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
      </div>
      
      {isExpanded && (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.product_id} className="cart-item">
                <div className="cart-item-info">
                  <span className="cart-item-name">{item.product_name}</span>
                  <span className="cart-item-price">
                    ${item.product_price.toFixed(2)}
                  </span>
                </div>
                <div className="cart-item-controls">
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn"
                      onClick={() => onUpdateQuantity(item.product_id, -1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={12} />
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => onUpdateQuantity(item.product_id, 1)}
                      disabled={isOutOfStock(findProductById(products, item.product_id))}
                      title={getStockTooltip(findProductById(products, item.product_id), "Add one more", "Out of stock")}
                    >
                      <Plus size={12} />
                    </button>
                    <button 
                      className="quantity-btn remove-btn"
                      onClick={() => onRemoveItem(item.product_id)}
                      title="Remove item from cart"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                  <div className="cart-item-total">
                    ${(item.product_price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-total">
            <div className="cart-total-line">
              <strong>Total: ${totalPrice.toFixed(2)}</strong>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartList;
