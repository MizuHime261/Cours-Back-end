const fs = require("fs");
const path = require("path");
const knex = require("./config/database"); // Kết nối MySQL với Knex.js

// Hàm đọc file JSON
const readJSON = (fileName) => {
  try {
    const filePath = path.join(__dirname, "data", fileName);
    const rawData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(rawData);
  } catch (error) {
    console.error(`❌ Lỗi đọc file ${fileName}:`, error);
    return [];
  }
};

// Seed dữ liệu cho bảng Authors
const seedAuthors = async (authors) => {
  try {
    await knex("Authors").insert(authors);
    console.log("✅ Seed bảng Authors thành công!");
  } catch (error) {
    console.error("❌ Lỗi seed bảng Authors:", error);
  }
};

// Seed dữ liệu cho bảng Categories
const seedCategories = async (categories) => {
  try {
    await knex("Categories").insert(categories);
    console.log("✅ Seed bảng Categories thành công!");
  } catch (error) {
    console.error("❌ Lỗi seed bảng Categories:", error);
  }
};

// Seed dữ liệu cho bảng Books
const seedBooks = async (books) => {
  try {
    await knex("Books").insert(books);
    console.log("✅ Seed bảng Books thành công!");
  } catch (error) {
    console.error("❌ Lỗi seed bảng Books:", error);
  }
};

// Seed dữ liệu cho bảng Reviews
const seedReviews = async (reviews) => {
  try {
    await knex("Reviews").insert(reviews);
    console.log("✅ Seed bảng Reviews thành công!");
  } catch (error) {
    console.error("❌ Lỗi seed bảng Reviews:", error);
  }
};

// Chạy seed dữ liệu
const runSeed = async () => {
  console.log("🚀 Bắt đầu seed dữ liệu...");
  const { books, authors, categories, reviews } = readJSON("data.json");

  await seedAuthors(authors);
  await seedCategories(categories);
  await seedBooks(books);
  await seedReviews(reviews);

  console.log("🎉 Seed dữ liệu hoàn tất!");
  process.exit(0);
};

runSeed();