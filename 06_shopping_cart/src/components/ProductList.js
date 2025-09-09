import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw } from 'lucide-react';
import ProductCard from './ProductCard';

const ProductList = ({ products, loading, error, onUpdate, onDelete, onRefresh, onAddToCart }) => {
  const gridRef = useRef(null);

  useEffect(() => {
    if (products.length > 0 && gridRef.current) {
      // Small delay to ensure DOM is fully rendered
      setTimeout(() => {
        const cards = gridRef.current.querySelectorAll('.product-card');
        if (cards.length === 0) return;

        // Reset heights to auto to measure natural heights
        cards.forEach(card => {
          card.style.height = 'auto';
        });

        // Force reflow: accessing offsetHeight forces the browser to recalculate layout
        const _reflow = gridRef.current.offsetHeight;

        // Find the tallest card
        let maxHeight = 0;
        cards.forEach(card => {
          const height = card.offsetHeight;
          if (height > maxHeight) {
            maxHeight = height;
          }
        });

        // Apply the max height to all cards
        cards.forEach(card => {
          card.style.height = `${maxHeight}px`;
        });
      }, 100);
    }
  }, [products]);

  if (loading) {
    return (
      <div className="loading">
        <RefreshCw className="animate-spin" size={24} />
        <span style={{ marginLeft: '0.5rem' }}>Loading products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="empty-state">
        <h3>Error Loading Products</h3>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={onRefresh}>
          <RefreshCw size={16} />
          Try Again
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <h3>No Products Yet</h3>
        <p>Start by adding your first product to the inventory.</p>
      </div>
    );
  }

  return (
    <div className="product-grid" ref={gridRef}>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductList;
