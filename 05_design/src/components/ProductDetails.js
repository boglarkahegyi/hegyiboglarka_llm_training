import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2, DollarSign, Package } from 'lucide-react';
import { productAPI } from '../services/api';
import ProductForm from './ProductForm';
import Modal from './Modal';

const ProductDetails = ({ onUpdate, onDelete, onBack }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productAPI.getById(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch product details');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const getStockStatus = (stock) => {
    if (stock > 50) return { class: 'stock-high', text: 'High Stock', color: '#059669' };
    if (stock > 10) return { class: 'stock-medium', text: 'Medium Stock', color: '#d97706' };
    return { class: 'stock-low', text: 'Low Stock', color: '#dc2626' };
  };

  const handleEdit = async (productData) => {
    try {
      const updatedProduct = await onUpdate(product.id, productData);
      setProduct(updatedProduct || { ...product, ...productData });
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(product.id);
      setShowDeleteModal(false);
      onBack();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (loading) {
    return (
      <div className="card">
        <div className="loading">Loading product details...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="card">
        <div className="empty-state">
          <h3>Error Loading Product</h3>
          <p>{error || 'Product not found'}</p>
          <button className="btn btn-primary" onClick={onBack}>
            <ArrowLeft size={16} />
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const stockStatus = getStockStatus(product.stock);

  return (
    <>
      <div className="card">
        <div className="card-header">
          <button className="btn btn-secondary" onClick={onBack}>
            <ArrowLeft size={16} />
            Back to Products
          </button>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className="btn btn-secondary"
              onClick={() => setShowEditModal(true)}
            >
              <Edit2 size={16} />
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => setShowDeleteModal(true)}
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>

        <div style={{ maxWidth: '600px' }}>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: '700', 
            marginBottom: '1rem',
            color: '#1e293b'
          }}>
            {product.name}
          </h1>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            <DollarSign size={32} style={{ color: '#059669' }} />
            <span style={{ 
              fontSize: '2.5rem', 
              fontWeight: '700', 
              color: '#059669'
            }}>
              {product.price.toFixed(2)}
            </span>
          </div>

          {product.description && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600', 
                marginBottom: '0.5rem',
                color: '#374151'
              }}>
                Description
              </h3>
              <p style={{ 
                color: '#64748b', 
                lineHeight: '1.6',
                fontSize: '1rem'
              }}>
                {product.description}
              </p>
            </div>
          )}

          <div>
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: '600', 
              marginBottom: '0.5rem',
              color: '#374151'
            }}>
              Inventory
            </h3>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem'
            }}>
              <Package size={24} style={{ color: stockStatus.color }} />
              <span style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600'
              }}>
                {product.stock} units
              </span>
              <span style={{ 
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: '500',
                backgroundColor: stockStatus.class === 'stock-high' ? '#dcfce7' : 
                                stockStatus.class === 'stock-medium' ? '#fef3c7' : '#fee2e2',
                color: stockStatus.color
              }}>
                {stockStatus.text}
              </span>
            </div>
          </div>

          <div style={{ 
            marginTop: '2rem',
            padding: '1rem',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            fontSize: '0.875rem',
            color: '#64748b'
          }}>
            <strong>Product ID:</strong> {product.id}
          </div>
        </div>
      </div>

      {showEditModal && (
        <Modal
          title="Edit Product"
          onClose={() => setShowEditModal(false)}
        >
          <ProductForm
            initialData={product}
            onSubmit={handleEdit}
            onCancel={() => setShowEditModal(false)}
            isEdit={true}
          />
        </Modal>
      )}

      {showDeleteModal && (
        <Modal
          title="Delete Product"
          onClose={() => setShowDeleteModal(false)}
        >
          <div>
            <p>Are you sure you want to delete "{product.name}"?</p>
            <p style={{ color: '#64748b', marginTop: '0.5rem' }}>
              This action cannot be undone.
            </p>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ProductDetails;
