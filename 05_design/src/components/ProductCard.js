import React, { useState } from 'react';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import ProductDetailsModal from './ProductDetailsModal';
import EditProductModal from './EditProductModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const ProductCard = ({ product, onUpdate, onDelete }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEdit = async (productData) => {
    try {
      await onUpdate(product.id, productData);
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(product.id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <>
      <div className="product-card">
        <div className="product-header">
          <h4 className="product-name">{product.name}</h4>
        </div>
        
        <div className="product-content">
          {product.description && (
            <div className="product-description">
              {product.description}
            </div>
          )}
        </div>
        
        <div className="product-footer">
          <span className="product-stock">Stock: {product.stock}</span>
          <span className="product-price">${product.price.toFixed(2)}</span>
        </div>
        
        <div className="product-actions">
          <button
            className="btn btn-secondary"
            onClick={() => setShowDetailsModal(true)}
          >
            <Eye size={14} />
            View
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setShowEditModal(true)}
          >
            <Edit2 size={14} />
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setShowDeleteModal(true)}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {showDetailsModal && (
        <ProductDetailsModal
          product={product}
          onClose={() => setShowDetailsModal(false)}
        />
      )}

      {showEditModal && (
        <EditProductModal
          product={product}
          onSubmit={handleEdit}
          onCancel={() => setShowEditModal(false)}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmationModal
          product={product}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
