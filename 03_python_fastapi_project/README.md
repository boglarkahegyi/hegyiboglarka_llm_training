# FastAPI Template

A simple FastAPI template with database integration using SQLAlchemy and SQLite.

## Features

- FastAPI web framework
- SQLAlchemy ORM with SQLite database, using async engine
- Pydantic models for data validation
- Product management endpoints
- Environment configuration with python-dotenv
- Development dependencies for testing and code formatting

## Installation

This project uses `uv` for dependency management. Make sure you have `uv` installed:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Install dependencies:

```bash
uv sync
```

## Running the Application

### Development Mode (with auto-reload)

```bash
uv run uvicorn main:app --reload
```

### Production Mode

```bash
uv run uvicorn main:app --host 0.0.0.0 --port 8000
```

The application will be available at `http://localhost:8000`

## API Endpoints

- `GET /` - Welcome message
- `POST /products/` - Create a new product
- `GET /products/` - Get all products
- `GET /products/{product_id}` - Get a product by ID
- `PUT /products/{product_id}` - Update a product by ID
- `DELETE /products/{product_id}` - Delete a product by ID

## Example Usage

### Create a product

```bash
curl -X POST "http://localhost:8000/products/" \
     -H "Content-Type: application/json" \
     -d '{"name": "hat", "price": 10, "stock": 5}'
```

### Get all products

```bash
curl -X GET "http://localhost:8000/products/"
```

### Get a product

```bash
curl -X GET "http://localhost:8000/products/1"
```

### Update a product

```bash
curl -X PUT "http://localhost:8000/products/1" \
     -H "Content-Type: application/json" \
     -d '{"price": 20, "stock": 10}'
```

### Delete a product

```bash
curl -X DELETE "http://localhost:8000/products/1"
```

## Configuration

Create a `.env` file in the project root to customize settings:

```env
APP_NAME=My FastAPI App
DATABASE_URL=sqlite+aiosqlite:///./app.db
DEBUG=true
```

## Database

The application uses SQLite by default, using the aiosqlite engine. The database file (`app.db`) will be created automatically when you first run the application.

## Development

Run tests:

```bash
uv run pytest
```

Format code:

```bash
uv run black .
uv run isort .
```

Lint code:

```bash
uv run flake8 .
```

## Dummy data for the database

# Add T-Shirt
```
curl -X POST http://localhost:8000/products/ \
-H "Content-Type: application/json" \
-d '{"name": "T-Shirt", "price": 19.99, "description": "A comfortable cotton t-shirt", "stock": 100}'
```

# Add Jeans
```
curl -X POST http://localhost:8000/products/ \
-H "Content-Type: application/json" \
-d '{"name": "Jeans", "price": 49.99, "description": "Stylish denim jeans", "stock": 50}'
```

# Add Jacket
```
curl -X POST http://localhost:8000/products/ \
-H "Content-Type: application/json" \
-d '{"name": "Jacket", "price": 89.99, "description": "A warm winter jacket", "stock": 30}'
```

# Add Sneakers
```
curl -X POST http://localhost:8000/products/ \
-H "Content-Type: application/json" \
-d '{"name": "Sneakers", "price": 59.99, "description": "Comfortable running sneakers", "stock": 75}'
```

# Add Hat
```
curl -X POST http://localhost:8000/products/ \
-H "Content-Type: application/json" \
-d '{"name": "Hat", "price": 14.99, "description": "A stylish summer hat", "stock": 200}'
```
