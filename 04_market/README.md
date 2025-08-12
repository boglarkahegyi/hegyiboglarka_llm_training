# Online Shop - React Project

This is a simple online shop application built with React. It allows users to view a list of products, view product details, edit products, create new products, and delete products.

## Features

- **Product List**: Displays a list of all available products.
- **Product Details**: View detailed information about a specific product.
- **Edit Product**: Update the details of an existing product.
- **Create Product**: Add a new product to the list.
- **Delete Product**: Remove a product from the list.

## Technologies Used

- **Frontend**: React
- **Styling**: CSS
- **Routing**: React Router
- **Backend**: FastAPI (for API endpoints)

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open the application in your browser:
   ```
   http://localhost:3000
   ```

## API Integration

This project communicates with a FastAPI backend. Ensure the backend is running on `http://localhost:8000` for the application to function correctly.

### Backend Setup

Refer to the `03_python_fastapi_project` directory for backend setup instructions.

## Project Structure

```
04_market/
├── public/                # Static files
├── src/
│   ├── components/        # React components
│   │   ├── ProductCard.js
│   │   ├── ProductCreate.js
│   │   ├── ProductDetails.js
│   │   ├── ProductEdit.js
│   │   └── ProductList.js
│   ├── App.js             # Main application component
│   ├── index.js           # Entry point
│   └── styles.css         # Global styles
├── package.json           # Project dependencies
└── README.md              # Project documentation
```

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)