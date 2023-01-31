# TypeScript-store-API

The database schema and API routes information can be found in the [requirements](REQUIREMENTS.md)

## Libraries used
- Runtime: Node.js
- Framework: Express
- Language: TypeScript
- Database: Postgresql
- Testing: Jasmine and Superjest

## Installation instructions
### Dev mode
`npm install` to install dependencies<br />
`npm run create-dev-db` to create a new database called `store`<br />
`npm run migrate` to create database tables<br />
`npm start` to run the app in dev mode

### Test mode
`npm install` to install dependencies<br />
`npm run create-test-db` to create a new database called `store_test`<br />
`npm run test` to excute test cases

## Ports
The application runs on port `3000`<br />
The database runs on port `5432`

## Setup for .env file
```
NODE_ENV=dev
PORT=3000
# DB
PG_HOST=localhost
PG_DB=store 
PG_DB_TEST=store_test
PG_USER=postgers
PG_PASSWORD=password
# bcrypt
PAPER=additionalPassword
SALT_Round=10
# JWT
JWT_SECRET=secret
```
