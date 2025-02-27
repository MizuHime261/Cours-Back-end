const fs = require('fs');
const path = require('path');
const pool = require('./database/database'); // Kết nối MySQL

// Hàm đọc file JSON
const readJSON = (fileName) => {
  try {
    const filePath = path.join(__dirname, 'data', fileName);
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error(`❌ Lỗi đọc file ${fileName}:`, error);
    return [];
  }
};

// Seed dữ liệu cho bảng Product
const seedProducts = async () => {
  try {
    const products = readJSON('products.json');

    for (const product of products) {
      const { id, productName, status, listing, comments, tags } = product;

      // Thêm sản phẩm vào bảng Product
      await pool.query(
        `INSERT INTO Product (id, productName, status) VALUES (?, ?, ?)`,
        [id, productName, status]
      );

      // Thêm dữ liệu vào bảng Listing (1-1)
      await pool.query(
        `INSERT INTO Listing (productId, description, price, rate) VALUES (?, ?, ?, ?)`,
        [id, listing.description, listing.price, listing.rate]
      );

      // Thêm dữ liệu vào bảng Comment (1-N)
      for (const comment of comments) {
        await pool.query(
          `INSERT INTO Comment (commentId, productId, content) VALUES (?, ?, ?)`,
          [comment.commentId, id, comment.content]
        );
      }

      // Thêm dữ liệu vào bảng Tag (N-N)
      for (const tag of tags) {
        // Kiểm tra nếu tag đã tồn tại
        const [existingTag] = await pool.query(
          `SELECT tagId FROM Tag WHERE tagName = ?`,
          [tag.tagName]
        );

        let tagId;
        if (existingTag.length > 0) {
          tagId = existingTag[0].tagId;
        } else {
          const result = await pool.query(
            `INSERT INTO Tag (tagId, tagName) VALUES (?, ?)`,
            [tag.tagId, tag.tagName]
          );
          tagId = tag.tagId;
        }

        // Thêm vào bảng Product_Tag
        await pool.query(
          `INSERT INTO Product_Tag (productId, tagId) VALUES (?, ?)`,
          [id, tagId]
        );
      }
    }
    console.log("✅ Seed bảng Product thành công!");
  } catch (error) {
    console.error("❌ Lỗi seed bảng Product:", error);
  }
};

// Chạy seed dữ liệu
const runSeed = async () => {
  await seedProducts();
  console.log("🎉 Seed dữ liệu thành công!");
  process.exit(0);
};

runSeed();
