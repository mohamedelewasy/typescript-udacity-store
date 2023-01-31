# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index route: `/api/products` [GET]
- Show route: `/api/products/:productId` [GET] (params: productId)
- Create route: `/api/products` [POST] [token-required] (body: name,price,category)
- Top 5 most popular products route: `/api/products/mostpopular` [GET]
- Products by category route: `/api/products?category=example` [GET] (query: category)

#### Users

- Index route: `/api/users` [GET] [token-required]
- Show route: `/api/users/:userId` [GET] [token-required]
- Register route: `/api/users/register` [POST] (body: first_name,last_name,username,password,passwordConfirm)
- Login route: `/api/users/login` [POST] (body: username,password)

#### Orders

- Add product route: `/api/orders` [POST] [token-required]
- Cart of products route: `/api/orders` [GET] [token-required]
- Current Order by user route: `/api/orders/active` [GET] [token-required]
- Completed Orders by user route: `/api/orders/complete` [GET] [token-required]

## Data Shapes

#### products

- id serial primary key
- name varchar
- price float
- category varchar
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(256),
  price FLOAT,
  category VARCHAR(32)
)
```

#### users

- id serial primary key
- firstName varchar
- lastName varchar
- username varchar unique
- password varchar
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(32),
  last_name VARCHAR(32),
  username VARCHAR(64) UNIQUE,
  password VARCHAR(256)
)
```

#### orders

- id serial primary key
- user_id integer [foreign-key to users table]
- status varchar
```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  status VARCHAR(10)
);
ALTER TABLE orders ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id);
```

#### order_product

- id serial primary key
- order_id integer [foreign-key to orders table]
- product_id integer [foreign-key to products table]
- quantity integer
```sql
CREATE TABLE order_product (
  id SERIAL PRIMARY KEY,
  order_id INTEGER,
  product_id INTEGER,
  quantity INTEGER
);
ALTER TABLE order_product ADD CONSTRAINT fk_order_id FOREIGN KEY (order_id) REFERENCES orders(id);
ALTER TABLE order_product ADD CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES products(id);
```
