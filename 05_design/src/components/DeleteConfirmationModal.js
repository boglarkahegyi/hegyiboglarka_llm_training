import React from 'react';

const DeleteConfirmationModal = ({ product, onConfirm, onCancel }) => {
  if (!product) return null;

  return (
    <div className="dialog-overlay" onClick={onCancel}>
      <div className="delete-confirmation-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="delete-dialog-content">
          <h2 className="delete-dialog-title">Delete Product</h2>
          
          <p className="delete-dialog-message">
            Are you sure you want to delete "{product.name}"? This action cannot be undone.
          </p>

          <div className="delete-dialog-buttons">
            <button
              type="button"
              className="dialog-btn delete-btn-cancel"
              onClick={onCancel}
            >
              Cancel
            </button>
            
            <button
              type="button"
              className="dialog-btn delete-btn-confirm"
              onClick={onConfirm}
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
