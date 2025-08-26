# LLM Training Projects Repository

A comprehensive collection of projects demonstrating various technologies and frameworks built during LLM training sessions.

## 📁 Projects Overview

This repository contains multiple projects showcasing different aspects of modern web development and Python programming:

### 🔧 02_python_tools - Python Package Development
A custom Python package (`hb_fancy_pack`) demonstrating modern Python packaging with UV and pyproject.toml configuration.

### 🚀 03_python_fastapi_project - FastAPI Backend Service
A complete REST API built with FastAPI and SQLite, providing CRUD operations for product management.

### 🛒 04_market - Basic React Product Catalog
A simple React application for displaying and managing products with basic functionality.

### 🎨 05_design - Advanced Product Management SPA
**★ Featured Project ★**

A sophisticated Single Page Application (SPA) for product management with pixel-perfect design implementation from Figma specifications.

## 🎯 Featured Project: Product Management SPA

### What It Does
A complete product management system with:
- **Product Display**: Responsive grid layout showcasing products with images, descriptions, and pricing
- **Search Functionality**: Real-time product filtering
- **CRUD Operations**: Create, Read, Update, and Delete products through intuitive modal dialogs
- **Responsive Design**: Optimized for various screen sizes with smart grid layout

### Key Features
- ✅ **Pixel-Perfect Design**: Implemented directly from Figma specifications
- ✅ **Four Custom Modal Dialogs**: Add Product, Edit Product, Product Details, Delete Confirmation
- ✅ **Smart Grid System**: Responsive layout with `minmax(220px, 1fr)` for optimal card distribution
- ✅ **Search Integration**: Filter products by name, description, or category
- ✅ **Modern UI/UX**: Clean interface with Inter font family and professional styling
- ✅ **Full API Integration**: Connected to FastAPI backend for real-time data management

### Tech Stack
- **Frontend**: React 18, Webpack, CSS Grid + Flexbox
- **Backend**: FastAPI, SQLite, Python
- **Styling**: Custom CSS with Figma-exact specifications
- **Icons**: Lucide React icon library
- **HTTP Client**: Axios for API communication

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python 3.9+
- Git

### Quick Start Guide

#### 1. Start the Backend API
```bash
cd 03_python_fastapi_project
# Install dependencies (using UV)
uv sync
# Run the FastAPI server
uv run uvicorn main:app --reload
```
The API will be available at `http://localhost:8000`

#### 2. Start the Frontend Application
```bash
cd 05_design
# Install dependencies
npm install
# Start the development server
npm start
```
The application will open at `http://localhost:3000`

### Alternative: Run Individual Projects

#### Python Tools Package
```bash
cd 02_python_tools/hb_fancy_pack
uv sync
uv run python src/fancy_pack/main.py
```

#### Basic React Market
```bash
cd 04_market
npm install
npm start
```

## 📋 API Documentation

The FastAPI backend provides the following endpoints:

- `GET /products` - Retrieve all products
- `POST /products` - Create a new product
- `GET /products/{id}` - Get specific product details
- `PUT /products/{id}` - Update existing product
- `DELETE /products/{id}` - Delete a product

Visit `http://localhost:8000/docs` for interactive API documentation.

## 🎨 Design Implementation

The main SPA project (`05_design`) features:

### Modal System
- **Add Product Dialog**: 388px width, gray input styling, proper field validation
- **Product Details Modal**: 444x286px, read-only product information display
- **Edit Product Dialog**: 388x351px, pre-populated fields with update functionality
- **Delete Confirmation**: 444x156px, confirmation dialog with product name display

### Responsive Layout
- **Grid System**: `grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))`
- **Card Design**: Uniform heights with flexible content areas
- **Mobile Optimized**: Seamless experience across device sizes

## 🔧 Development Features

- **Hot Reload**: Both frontend and backend support automatic reloading
- **Modern Tooling**: Webpack for frontend, UV for Python package management
- **Clean Architecture**: Separated concerns with dedicated service layers
- **Type Safety**: Proper TypeScript patterns where applicable

## 📁 Project Structure

```
├── 02_python_tools/          # Python package development
├── 03_python_fastapi_project/ # Backend API service
├── 04_market/                # Basic React catalog
└── 05_design/                # Advanced SPA (main project)
    ├── src/
    │   ├── components/        # React components
    │   ├── services/          # API service layer
    │   └── styles/            # CSS styling
    └── public/                # Static assets
```

## 🎯 Usage Examples

### Adding a New Product
1. Click "Add Product" button (top-right corner)
2. Fill in product details in the modal dialog
3. Submit to create the product
4. Product appears immediately in the grid

### Searching Products
1. Use the search bar at the top
2. Type product name, description, or category
3. Results filter in real-time

### Managing Products
- **View Details**: Click "View" button on any product card
- **Edit Product**: Click "Edit" to modify product information
- **Delete Product**: Click "Delete" for removal confirmation

## 🚀 Deployment Ready

Both frontend and backend are configured for easy deployment:
- **Frontend**: Static build with `npm run build`
- **Backend**: Production-ready FastAPI with SQLite database

## 👨‍💻 Development Notes

This project demonstrates:
- Modern React development patterns
- RESTful API design with FastAPI
- Responsive web design principles
- Integration between frontend and backend systems
- Professional UI/UX implementation from design specifications

## 🔄 Recent Updates

- ✅ Implemented pixel-perfect Figma design compliance
- ✅ Added comprehensive modal dialog system
- ✅ Optimized responsive grid layout
- ✅ Enhanced search functionality
- ✅ Improved code organization and documentation
