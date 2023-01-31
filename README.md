# TypeScript-store-API

The database schema and API routes information can be found in the [requirements](REQUIREMENTS.md)

## Libraries used
- Runtime: Node.js
- Framework: Express
- Language: TypeScript
- Database: Postgresql
- Testing: Jasmine and Superjest

## Available Scripts

#### Install the app's dependencies

```
npm install
```

#### Build a copy of app to 'dist' folder
```
npm run build
```

#### setup the database tables
```
npm run migrate
```

#### Run the app in development mode
```
npm start
```
A sample request to try out.<br />
`http://localhost:3000/api/products`

#### Run test cases
```
npm run test
```

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
