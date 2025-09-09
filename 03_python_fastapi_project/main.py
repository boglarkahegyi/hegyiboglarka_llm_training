from contextlib import asynccontextmanager
from typing import List

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession

from config import settings
from database import create_tables, get_db, Product


class ProductBase(BaseModel):
    name: str
    price: float
    description: str = None
    stock: int


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: str = None
    price: float = None
    description: str = None
    stock: int = None


class ProductResponse(BaseModel):
    id: int
    name: str
    price: float
    description: str = None
    stock: int

    class Config:
        from_attributes = True


class CartAddRequest(BaseModel):
    product_id: int
    quantity: int = 1


class CartAddResponse(BaseModel):
    success: bool
    message: str
    updated_stock: int


@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_tables()
    yield


app = FastAPI(title=settings.app_name, lifespan=lifespan)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI Project"}


@app.post("/products/", response_model=ProductResponse)
async def create_product(product: ProductCreate, db: AsyncSession = Depends(get_db)):
    existing_product = await db.execute(
        select(Product).filter(Product.name == product.name)
    )
    if existing_product.scalar():
        raise HTTPException(
            status_code=400, detail="Product with this name already exists"
        )

    db_product = Product(
        name=product.name,
        price=product.price,
        description=product.description or "",
        stock=product.stock,
    )
    db.add(db_product)
    await db.commit()
    await db.refresh(db_product)
    return db_product


@app.get("/products/", response_model=List[ProductResponse])
async def get_products(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Product))
    products = result.scalars().all()
    return products


@app.get("/products/{product_id}", response_model=ProductResponse)
async def get_product_by_id(product_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Product).filter(Product.id == product_id))
    db_product = result.scalar()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product


@app.put("/products/{product_id}", response_model=ProductResponse)
async def update_product(
    product_id: int,
    product: ProductUpdate,
    db: AsyncSession = Depends(get_db),
):
    existing_product = await db.execute(
        select(Product).filter(Product.id == product_id)
    )
    db_product = existing_product.scalar()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")

    update_data = product.dict(exclude_unset=True)
    stmt = (
        update(Product)
        .where(Product.id == product_id)
        .values(**update_data)
        .execution_options(synchronize_session="fetch")
    )
    await db.execute(stmt)
    await db.commit()
    await db.refresh(db_product)
    return db_product


@app.delete("/products/{product_id}", status_code=204)
async def delete_product(product_id: int, db: AsyncSession = Depends(get_db)):
    existing_product = await db.execute(
        select(Product).filter(Product.id == product_id)
    )
    db_product = existing_product.scalar()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")

    stmt = delete(Product).where(Product.id == product_id)
    await db.execute(stmt)
    await db.commit()


@app.post("/cart/add", response_model=CartAddResponse)
async def add_to_cart(cart_request: CartAddRequest, db: AsyncSession = Depends(get_db)):
    # Get the product
    result = await db.execute(select(Product).filter(Product.id == cart_request.product_id))
    db_product = result.scalar()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Check if enough stock is available
    if db_product.stock < cart_request.quantity:
        raise HTTPException(
            status_code=400, 
            detail=f"Not enough stock available. Only {db_product.stock} items left."
        )
    
    # Decrease the stock
    new_stock = db_product.stock - cart_request.quantity
    stmt = (
        update(Product)
        .where(Product.id == cart_request.product_id)
        .values(stock=new_stock)
        .execution_options(synchronize_session="fetch")
    )
    await db.execute(stmt)
    await db.commit()
    
    return CartAddResponse(
        success=True,
        message=f"Added {cart_request.quantity} item(s) to cart",
        updated_stock=new_stock
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
