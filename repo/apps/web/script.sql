CREATE DATABASE IF NOT EXISTS my_database;
USE my_database;

CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS my_database.loans (
    document_id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    expiration_date VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL
);

INSERT INTO admin_users (name, email, password) VALUES
('Pablo Terceros', 'user1@example.com', 'password1'),
('Andres Camacho', 'user2@example.com', 'password2');

INSERT INTO my_database.loans (document_id, user_id, expiration_date, state) VALUES
('978-0-19-715402-3', '1', '20/07/2024', 'completed'),
('978-0-8231-7820-9', '2', '20/07/2024', 'pending'),
('978-0-19-715402-1', '3', '20/07/2024', 'completed');