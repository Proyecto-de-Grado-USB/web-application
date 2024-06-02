CREATE DATABASE IF NOT EXISTS my_database;
USE my_database;

CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO admin_users (name, email, password) VALUES
('Pablo Terceros', 'user1@example.com', 'password1'),
('Andres Camacho', 'user2@example.com', 'password2');
