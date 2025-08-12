import React from 'react';

function ProductCard({ product }) {
    return (
        <div className="product-card">
            <h2>{product.name}</h2>
            <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
        </div>
    );
}

export default ProductCard;
