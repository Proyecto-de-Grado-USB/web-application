CREATE DATABASE IF NOT EXISTS my_database;
USE my_database;

CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS my_database.loans (
    loan_id INT AUTO_INCREMENT PRIMARY KEY,
    document_id VARCHAR(255),
    user_id VARCHAR(255) NOT NULL,
    expiration_date VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    teacher VARCHAR(255) NOT NULL,
    career VARCHAR(255) NOT NULL,
    reg_univ VARCHAR(255) NOT NULL
);

INSERT INTO admin_users (name, email, password) VALUES
('Pablo Terceros', 'user1@example.com', 'password1'),
('Andres Camacho', 'user2@example.com', 'password2');

INSERT INTO my_database.loans (
  document_id, 
  user_id, 
  expiration_date, 
  state, 
  user_name, 
  phone, 
  email, 
  teacher, 
  career, 
  reg_univ
) VALUES
('978-0-19-715402-1', '1', '2024-08-20', 'standby', 'Juan Perez', '70000001', 'juan.perez@example.com', 'Prof. Gomez', 'Ingeniería', '20210001'),
('978-0-19-715402-2', '2', '2024-07-20', 'pending', 'Maria Lopez', '70000002', 'maria.lopez@example.com', 'Prof. Martinez', 'Medicina', '20210002'),
('978-0-19-715402-3', '3', '2024-07-20', 'completed', 'Carlos Ruiz', '70000003', 'carlos.ruiz@example.com', 'Prof. Fernandez', 'Derecho', '20210003');