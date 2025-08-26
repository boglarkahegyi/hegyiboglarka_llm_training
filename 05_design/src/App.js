import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Search } from 'lucide-react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ProductDetails from './components/ProductDetails';
import { productAPI } from './services/api';

function App() {
  const [activeTab, setActiveTab] = useState('list');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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
      </div>
    </Router>
  );
}

export default App;
