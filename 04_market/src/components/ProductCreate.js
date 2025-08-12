import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCreate.css';

function ProductCreate() {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/products/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });
            if (!response.ok) {
                throw new Error('Failed to create product');
            }
            navigate('/'); // Redirect to the product list
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <div className="product-create-container">
            <form className="product-create-form" onSubmit={handleSubmit}>
                <h2>Create Product</h2>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Stock:
                    <input
                        type="number"
                        name="stock"
                        value={product.stock}
                        onChange={handleChange}
                        required
                    />
                </label>
                <div className="form-buttons-right">
                    <button type="submit" className="create-button">Save</button>
                </div>
            </form>
        </div>
    );
}

export default ProductCreate;
