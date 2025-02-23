-- Tạo cơ sở dữ liệu và sử dụng nó
CREATE DATABASE IF NOT EXISTS dev_data_db;
USE dev_data_db;

-- Tạo bảng User (lưu tách các trường của address và company)
CREATE TABLE Users (
  id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  street VARCHAR(255),
  suite VARCHAR(255),
  city VARCHAR(255),
  zipcode VARCHAR(50),
  lat VARCHAR(50),
  lng VARCHAR(50),
  phone VARCHAR(50),
  website VARCHAR(255),
  company_name VARCHAR(255),
  company_catchPhrase VARCHAR(255),
  company_bs VARCHAR(255),
  interests JSON
);

-- Tạo bảng Album
CREATE TABLE Albums (
  id INT PRIMARY KEY,
  userId INT,
  title VARCHAR(255),
  CONSTRAINT fk_user_album FOREIGN KEY (userId) REFERENCES Users(id)
);

-- Tạo bảng Photo
CREATE TABLE Photos (
  id INT PRIMARY KEY,
  albumId INT,
  title VARCHAR(255),
  url VARCHAR(255),
  thumbnailUrl VARCHAR(255),
  CONSTRAINT fk_album_photo FOREIGN KEY (albumId) REFERENCES Albums(id)
);
