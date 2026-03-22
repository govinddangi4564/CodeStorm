-- Run these queries in your MySQL console, phpMyAdmin, or MySQL Workbench

-- 1. Create the Database
CREATE DATABASE IF NOT EXISTS climatedb;

-- 2. Switch to the newly created Database
USE climatedb;

-- 3. Create Users Table
CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    xp INT DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. Create Articles Table
CREATE TABLE IF NOT EXISTS Articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category ENUM('Science', 'Policy', 'Solutions', 'News') NOT NULL,
    author VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    tags JSON,
    views INT DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 5. Create Pledges Table
CREATE TABLE IF NOT EXISTS Pledges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    pledgeItems JSON NOT NULL,
    message TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE SET NULL
);

-- 6. Create FootprintLogs Table
CREATE TABLE IF NOT EXISTS FootprintLogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    transport FLOAT NOT NULL DEFAULT 0,
    energy FLOAT NOT NULL DEFAULT 0,
    diet FLOAT NOT NULL DEFAULT 0,
    shopping FLOAT NOT NULL DEFAULT 0,
    total_kg_co2 FLOAT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
);

-- 7. Create Challenges Table
CREATE TABLE IF NOT EXISTS Challenges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    xp_reward INT NOT NULL DEFAULT 10,
    icon VARCHAR(255) DEFAULT 'Leaf',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- SOLVING THE "ACCESS DENIED" ERROR:
-- ==========================================
-- The error "Access denied for user 'root'" happens because your MySQL root user 
-- has a required password, but DB_PASS in backend/.env is empty.
-- 
-- OPTION A: If you know your MySQL root password, simply open `backend/.env` 
-- and change `DB_PASS=` to `DB_PASS=your_actual_password_here`.
--
-- OPTION B: Create a brand new user for this app by running the following 3 queries:
-- CREATE USER 'climate_user'@'localhost' IDENTIFIED BY 'climate_pass123';
-- GRANT ALL PRIVILEGES ON climatedb.* TO 'climate_user'@'localhost';
-- FLUSH PRIVILEGES;
-- (Then, change backend/.env to: DB_USER=climate_user and DB_PASS=climate_pass123)
