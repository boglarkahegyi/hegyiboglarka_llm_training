import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css';

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8000/products/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <p className="loading">Loading product details...</p>;
    }

    if (!product) {
        return <p className="error">Product not found.</p>;
    }

    const handleEdit = () => {
        navigate(`/products/${id}/edit`);
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const response = await fetch(`http://localhost:8000/products/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Failed to delete product');
                }
                navigate('/'); 
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    return (
        <div className="product-details-container">
            <div className="product-details-card">
                <h2 className="product-details-title">{product.name}</h2>
                <p className="product-details-description">{product.description}</p>
                <p className="product-details-price"><strong>Price:</strong> ${product.price.toFixed(2)}</p>
                <p className="product-details-stock"><strong>Stock:</strong> {product.stock}</p>
                <div className="details-buttons">
                    <button className="delete-button" onClick={handleDelete}>Delete</button>
                    <button className="edit-button" onClick={handleEdit}>Edit</button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
