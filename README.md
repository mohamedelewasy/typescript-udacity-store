# TypeScript-store-API

## Available Scripts

### npm run build

build a copy of site to the 'dist' folder

### npm start

Runs the app in the development mode.<br />
A sample request to try out.<br />
Then open http://localhost:3000/api/products

### npm run test

run all test cases using jasmine

### npm run migrate

set database for development environment

### npm run migrate-test

set database for test environment

### npm run demigrate

remove database tables for development environment

### npm run demigrate-test

remove database tables for test environment

## Setup for .env file

NODE_ENV=dev <br />
PORT=3000 <br />
PG_HOST= your local host <br />
PG_DB= your database name <br />
PG_DB_TEST= your test database name <br />
PG_USER= your database user <br />
PG_PASSWORD= your database user password <br />
PAPER= your paper secret <br />
SALT_Round= your salt rounds <br />
JWT_SECRET= your jwt secret <br />
