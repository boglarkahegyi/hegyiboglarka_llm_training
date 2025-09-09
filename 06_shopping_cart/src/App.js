import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Search } from 'lucide-react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ProductDetails from './components/ProductDetails';
import CartList from './components/CartList';
import { productAPI, cartAPI } from './services/api';

function App() {
  const [activeTab, setActiveTab] = useState('list');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productAPI.getAll();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductCreate = async (productData) => {
    try {
      await productAPI.create(productData);
      await fetchProducts();
      setActiveTab('list');
    } catch (err) {
      throw new Error('Failed to create product');
    }
  };

  const handleProductUpdate = async (id, productData) => {
    try {
      await productAPI.update(id, productData);
      await fetchProducts();
    } catch (err) {
      throw new Error('Failed to update product');
    }
  };

  const handleProductDelete = async (id) => {
    try {
      await productAPI.delete(id);
      await fetchProducts();
    } catch (err) {
      throw new Error('Failed to delete product');
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      // Find the product first
      const product = products.find(p => p.id === productId);
      if (!product) {
        console.error('Product not found');
        return;
      }

      // Check if product is in stock
      if (product.stock <= 0) {
        alert('This product is out of stock!');
        return;
      }

      const result = await cartAPI.addToCart(productId, 1);
      
      // Update local product stock
      setProducts(prevProducts => 
        prevProducts.map(prod => 
          prod.id === productId 
            ? { ...prod, stock: result.updated_stock }
            : prod
        )
      );

      // Add to cart state
      setCart(prevCart => {
        const existingItem = prevCart.find(item => item.product_id === productId);
        if (existingItem) {
          return prevCart.map(item =>
            item.product_id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prevCart, {
            product_id: productId,
            product_name: product.name,
            product_price: product.price,
            quantity: 1
          }];
        }
      });
      
    } catch (err) {
      console.error('Failed to add to cart:', err);
      if (err.response?.data?.detail) {
        alert(err.response.data.detail);
      } else {
        alert('Failed to add item to cart. Please try again.');
      }
    }
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Router>
      <div className="App">
        <div className="container">
          <div className="page-header">
            <h1 className="page-title">Product Management</h1>
            <div className="header-actions">
              <div className="search-container">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                className="btn btn-primary add-product-btn"
                onClick={() => setActiveTab('create')}
              >
                Add Product
              </button>
            </div>
          </div>

          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <ProductList
                    products={filteredProducts}
                    loading={loading}
                    error={error}
                    onUpdate={handleProductUpdate}
                    onDelete={handleProductDelete}
                    onRefresh={fetchProducts}
                    onAddToCart={handleAddToCart}
                  />
                  {activeTab === 'create' && (
                    <ProductForm
                      onSubmit={handleProductCreate}
                      onCancel={() => setActiveTab('list')}
                    />
                  )}
                </>
              } 
            />
            <Route 
              path="/product/:id" 
              element={
                <ProductDetails
                  onUpdate={handleProductUpdate}
                  onDelete={handleProductDelete}
                  onBack={() => setActiveTab('list')}
                />
              } 
            />
          </Routes>
        </div>
        
        <CartList cart={cart} />
      </div>
    </Router>
  );
}

export default App;
