CREATE DATABASE IF NOT EXISTS my_database;
USE my_database;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL
);

INSERT INTO users (email, password, role) VALUES
('user1@example.com', 'password1', 'admin'),
('user2@example.com', 'password2', 'user'),
('user3@example.com', 'password3', 'user'),
('user4@example.com', 'password4', 'admin'),
('user5@example.com', 'password5', 'user');
