CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(32),
  last_name VARCHAR(32),
  username VARCHAR(64) UNIQUE,
  password VARCHAR(256)
)