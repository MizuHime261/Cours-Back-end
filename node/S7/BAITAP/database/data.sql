CREATE DATABASE ProductDB;
USE ProductDB;

-- Bảng Product
CREATE TABLE Product (
    id INT PRIMARY KEY AUTO_INCREMENT,
    productName VARCHAR(255) NOT NULL,
    status BOOLEAN NOT NULL
);

-- Bảng Listing (1-1 với Product)
CREATE TABLE Listing (
    id INT PRIMARY KEY AUTO_INCREMENT,
    productId INT UNIQUE,
    description TEXT,
    price DECIMAL(10,2),
    rate INT CHECK (rate BETWEEN 1 AND 5),
    FOREIGN KEY (productId) REFERENCES Product(id) ON DELETE CASCADE
);

-- Bảng Comment (1-N với Product)
CREATE TABLE Comment (
    commentId INT PRIMARY KEY AUTO_INCREMENT,
    productId INT,
    content TEXT,
    FOREIGN KEY (productId) REFERENCES Product(id) ON DELETE CASCADE
);

-- Bảng Tag
CREATE TABLE Tag (
    tagId INT PRIMARY KEY AUTO_INCREMENT,
    tagName VARCHAR(50) UNIQUE NOT NULL
);

-- Bảng trung gian Product_Tag (N-N giữa Product và Tag)
CREATE TABLE Product_Tag (
    productId INT,
    tagId INT,
    PRIMARY KEY (productId, tagId),
    FOREIGN KEY (productId) REFERENCES Product(id) ON DELETE CASCADE,
    FOREIGN KEY (tagId) REFERENCES Tag(tagId) ON DELETE CASCADE
);
