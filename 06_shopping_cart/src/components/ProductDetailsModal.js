import React from 'react';
import { X } from 'lucide-react';

const ProductDetailsModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="product-details-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="product-details-header">
          <h2>Product Details</h2>
          <button
            type="button"
            className="dialog-close-btn"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <div className="product-details-content">
          <div className="product-details-title">
            {product.name}
          </div>
          
          <div className="product-details-description">
            {product.description || 'No description available.'}
          </div>

          <div className="product-details-separator"></div>

          <div className="product-details-info">
            <div className="product-info-item">
              <span className="product-info-label">Price:</span>
              <span className="product-info-value product-info-price">$ {product.price}</span>
            </div>
            
            <div className="product-info-item">
              <span className="product-info-label">Stock:</span>
              <span className="product-info-value">{product.stock} units</span>
            </div>
          </div>

          <div className="product-details-id">
            <span className="product-info-label">Product ID:</span>
            <span className="product-info-value product-info-id">{product.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
