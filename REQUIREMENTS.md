# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index route: /products [GET]
- Show route: /products/:productId [GET] (params: productId)
- Create route: /products [POST] [token-required] (body: name,price,category)
- Top 5 most popular products route: /products/mostpopular [GET]
- Products by category route: /products?category=example [GET] (query: category)

#### Users

- Index route: /users [GET] [token-required]
- Show route: /users/:userId [GET] [token-required]
- Register route: /users/register [POST] (body: first_name,last_name,username,password,passwordConfirm)
- Login route: /users/login [POST] (body: username,password)

#### Orders

- Add product route: /orders [POST] [token-required]
- Cart of products route: /orders [GET] [token-required]
- Current Order by user route: /orders/active [GET] [token-required]
- Completed Orders by user route: /orders/complete [GET] [token-required]

## Data Shapes

#### products

- id serial primary key
- name varchar
- price float
- category varchar

#### users

- id serial primary key
- firstName varchar
- lastName varchar
- username varchar unique
- password varchar

#### orders

- id serial primary key
- user_id integer [foreign-key to users table]
- status varchar

#### order_product

- id serial primary key
- order_id integer [foreign-key to orders table]
- product_id integer [foreign-key to products table]
- quantity integer
