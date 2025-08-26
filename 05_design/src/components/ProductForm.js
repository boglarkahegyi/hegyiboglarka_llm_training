import React, { useState } from 'react';
import { X } from 'lucide-react';

const ProductForm = ({ initialData = null, onSubmit, onCancel, isEdit = false }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    price: initialData?.price || '',
    description: initialData?.description || '',
    stock: initialData?.stock || '',
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
      
      // Reset form if not editing
      if (!isEdit) {
        setFormData({
          name: '',
          price: '',
          description: '',
          stock: '',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: error.message || 'Failed to save product' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dialog-overlay" onClick={onCancel}>
      <div className="product-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="product-dialog-header">
          <h2>Add New Product</h2>
          {onCancel && (
            <button
              type="button"
              className="dialog-close-btn"
              onClick={onCancel}
              disabled={loading}
            >
              <X size={20} />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="product-dialog-form">
          <div className="dialog-form-group">
            <label className="dialog-form-label">Product Name</label>
            <input
              type="text"
              name="name"
              className={`dialog-form-input ${errors.name ? 'error' : ''}`}
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              disabled={loading}
            />
            {errors.name && (
              <div className="dialog-error-message">
                {errors.name}
              </div>
            )}
          </div>

          <div className="dialog-form-group">
            <label className="dialog-form-label">Description</label>
            <textarea
              name="description"
              className="dialog-form-textarea"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              disabled={loading}
              rows="3"
            />
          </div>

          <div className="dialog-form-row">
            <div className="dialog-form-group dialog-form-group-half">
              <label className="dialog-form-label">Price ($)</label>
              <input
                type="number"
                name="price"
                className={`dialog-form-input ${errors.price ? 'error' : ''}`}
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                disabled={loading}
              />
              {errors.price && (
                <div className="dialog-error-message">
                  {errors.price}
                </div>
              )}
            </div>

            <div className="dialog-form-group dialog-form-group-half">
              <label className="dialog-form-label">Stock</label>
              <input
                type="number"
                name="stock"
                className={`dialog-form-input ${errors.stock ? 'error' : ''}`}
                value={formData.stock}
                onChange={handleChange}
                placeholder="0"
                min="0"
                disabled={loading}
              />
              {errors.stock && (
                <div className="dialog-error-message">
                  {errors.stock}
                </div>
              )}
            </div>
          </div>

        {errors.submit && (
          <div className="dialog-submit-error">
            {errors.submit}
          </div>
        )}

        <div className="dialog-buttons">
          <button
            type="button"
            className="dialog-btn dialog-btn-cancel"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          
          <button
            type="submit"
            className="dialog-btn dialog-btn-add"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Product'}
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default ProductForm;
