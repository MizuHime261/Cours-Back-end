CREATE DATABASE IF NOT EXISTS BookStore;
USE BookStore;

CREATE TABLE Authors (
    authorId INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE Categories (
    categoryId INT PRIMARY KEY AUTO_INCREMENT,
    categoryName VARCHAR(255) NOT NULL
);

CREATE TABLE Books (
    bookId INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    authorId INT,
    categoryId INT,
    price DECIMAL(10,2),
    rate FLOAT,
    FOREIGN KEY (authorId) REFERENCES Authors(authorId) ON DELETE CASCADE,
    FOREIGN KEY (categoryId) REFERENCES Categories(categoryId) ON DELETE CASCADE
);

CREATE TABLE Reviews (
    reviewId INT PRIMARY KEY AUTO_INCREMENT,
    bookId INT,
    content TEXT NOT NULL,
    FOREIGN KEY (bookId) REFERENCES Books(bookId) ON DELETE CASCADE
);

select * from books;
select * from categories;