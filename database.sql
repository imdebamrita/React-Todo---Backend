CREATE DATABASE perntodo;

CREATE TABLE todo (
    id SERIAL PRIMARY KEY,
    description TEXT,
    category VARCHAR(255),
    completed BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);