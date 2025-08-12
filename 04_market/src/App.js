import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import ProductEdit from './components/ProductEdit';
import ProductCreate from './components/ProductCreate';
import './styles.css';

function App() {
    return (
        <Router>
            <header>
                <h1>Online Shop</h1>
                <nav className="navbar">
                    <Link to="/" className="nav-link">Products</Link>
                </nav>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route path="/products/:id/edit" element={<ProductEdit />} />
                    <Route path="/products/create" element={<ProductCreate />} />
                </Routes>
            </main>
            <footer>
                <p>&copy; 2023 Online Shop</p>
            </footer>
        </Router>
    );
}

export default App;
