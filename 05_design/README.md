# Product Management SPA

A modern Single Page Application (SPA) for product management, built with React and connected to a FastAPI backend.

## Features

- **Product Listing**: View all products with search, filtering, and sorting capabilities
- **Product Management**: Create, edit, and delete products
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Connects to FastAPI backend for live data
- **Modern UI**: Clean, professional interface with smooth animations

## Technology Stack

- **Frontend**: React 18, React Router
- **Styling**: Pure CSS with modern design patterns
- **HTTP Client**: Axios for API communication
- **Icons**: Lucide React
- **Build Tool**: Webpack
- **Backend**: FastAPI (Python)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- FastAPI backend running on `http://localhost:8000`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## API Integration

The application connects to the FastAPI backend with the following endpoints:

- `GET /products/` - Get all products
- `POST /products/` - Create a new product
- `GET /products/{id}` - Get product by ID
- `PUT /products/{id}` - Update product
- `DELETE /products/{id}` - Delete product

## Features Overview

### Product List View
- Grid layout with product cards
- Search functionality
- Filter by stock levels (High, Medium, Low)
- Sort by name, price, or stock
- Responsive design

### Product Form
- Create new products
- Edit existing products
- Form validation
- Error handling

### Product Details
- Detailed product view
- Stock status indicators
- Edit and delete actions
- Navigation breadcrumbs

## Project Structure

```
src/
├── components/
│   ├── Header.js          # Application header
│   ├── ProductList.js     # Product listing with search/filter
│   ├── ProductCard.js     # Individual product card
│   ├── ProductForm.js     # Create/edit product form
│   ├── ProductDetails.js  # Detailed product view
│   └── Modal.js           # Reusable modal component
├── services/
│   └── api.js             # API service layer
├── styles/
│   └── global.css         # Global styles and theme
├── App.js                 # Main application component
└── index.js               # Application entry point
```

## Design Features

- **Modern UI**: Clean, professional interface inspired by modern web applications
- **Color Scheme**: Purple gradient primary colors with neutral grays
- **Typography**: Inter font family for modern, readable text
- **Icons**: Lucide React icons for consistent iconography
- **Responsive**: Mobile-first design that works on all screen sizes
- **Animations**: Smooth hover effects and transitions
- **Accessibility**: Semantic HTML and keyboard navigation support

## Development

The application is configured with:

- Hot reload for development
- Babel for ES6+ transpilation
- CSS loading and processing
- Development server with proxy support

To contribute or modify the application, edit the files in the `src/` directory and the changes will be automatically reflected in the browser.
