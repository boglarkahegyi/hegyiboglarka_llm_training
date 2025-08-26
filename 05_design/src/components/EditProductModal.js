import React, { useState } from 'react';
import { X } from 'lucide-react';

const EditProductModal = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || '',
    description: product?.description || '',
    stock: product?.stock || '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (!formData.stock || formData.stock < 0) {
      newErrors.stock = 'Stock must be 0 or greater';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const submitData = {
        name: formData.name.trim(),
        price: parseFloat(formData.price),
        description: formData.description.trim(),
        stock: parseInt(formData.stock),
      };

      await onSubmit(submitData);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: error.message || 'Failed to update product' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dialog-overlay" onClick={onCancel}>
      <div className="edit-product-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="edit-dialog-header">
          <h2>Edit Product</h2>
          <button
            type="button"
            className="dialog-close-btn"
            onClick={onCancel}
            disabled={loading}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-dialog-form">
          <div className="edit-form-group">
            <label className="edit-form-label">Product Name</label>
            <input
              type="text"
              name="name"
              className={`edit-form-input ${errors.name ? 'error' : ''}`}
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              disabled={loading}
            />
            {errors.name && (
              <div className="edit-error-message">
                {errors.name}
              </div>
            )}
          </div>

          <div className="edit-form-group">
            <label className="edit-form-label">Description</label>
            <textarea
              name="description"
              className="edit-form-textarea"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              disabled={loading}
              rows="4"
            />
          </div>

          <div className="edit-form-row">
            <div className="edit-form-group edit-form-group-half">
              <label className="edit-form-label">Price ($)</label>
              <input
                type="number"
                name="price"
                className={`edit-form-input ${errors.price ? 'error' : ''}`}
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                disabled={loading}
              />
              {errors.price && (
                <div className="edit-error-message">
                  {errors.price}
                </div>
              )}
            </div>

            <div className="edit-form-group edit-form-group-half">
              <label className="edit-form-label">Stock</label>
              <input
                type="number"
                name="stock"
                className={`edit-form-input ${errors.stock ? 'error' : ''}`}
                value={formData.stock}
                onChange={handleChange}
                placeholder="0"
                min="0"
                disabled={loading}
              />
              {errors.stock && (
                <div className="edit-error-message">
                  {errors.stock}
                </div>
              )}
            </div>
          </div>

          {errors.submit && (
            <div className="edit-submit-error">
              {errors.submit}
            </div>
          )}

          <div className="edit-dialog-buttons">
            <button
              type="button"
              className="dialog-btn edit-btn-cancel"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
            
            <button
              type="submit"
              className="dialog-btn edit-btn-update"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
