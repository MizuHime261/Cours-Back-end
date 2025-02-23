const fs = require('fs');
const path = require('path');
const pool = require('./database/database'); // File cấu hình kết nối MySQL

// Seed dữ liệu cho bảng Users
async function seedUsers() {
  try {
    const filePath = path.join(__dirname, 'data', 'users.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(rawData);

    for (let user of data) {
      const {
        id,
        name,
        username,
        email,
        address,
        phone,
        website,
        company,
        interests
      } = user;

      // Tách các trường của address
      const street = address?.street || null;
      const suite = address?.suite || null;
      const city = address?.city || null;
      const zipcode = address?.zipcode || null;
      const lat = address?.geo?.lat || null;
      const lng = address?.geo?.lng || null;

      // Tách các trường của company
      const company_name = company?.name || null;
      const company_catchPhrase = company?.catchPhrase || null;
      const company_bs = company?.bs || null;

      const sql = `
        INSERT INTO Users 
          (id, name, username, email, street, suite, city, zipcode, lat, lng, phone, website, company_name, company_catchPhrase, company_bs, interests)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        id,
        name,
        username,
        email,
        street,
        suite,
        city,
        zipcode,
        lat,
        lng,
        phone,
        website,
        company_name,
        company_catchPhrase,
        company_bs,
        JSON.stringify(interests) // chuyển mảng interests thành chuỗi JSON
      ];

      await pool.query(sql, values);
    }
    console.log("Seed bảng Users thành công!");
  } catch (error) {
    console.error("Lỗi seed bảng Users:", error);
  }
}

// Seed dữ liệu cho bảng Albums
async function seedAlbums() {
  try {
    const filePath = path.join(__dirname, 'data', 'albums.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(rawData);

    for (let album of data) {
      const { id, userId, title } = album;
      const sql = `INSERT INTO Albums (id, userId, title) VALUES (?, ?, ?)`;
      const values = [id, userId, title];
      await pool.query(sql, values);
    }
    console.log("Seed bảng Albums thành công!");
  } catch (error) {
    console.error("Lỗi seed bảng Albums:", error);
  }
}

// Seed dữ liệu cho bảng Photos
async function seedPhotos() {
  try {
    // Lưu ý: file JSON chứa danh sách photos có tên là "photo.json"
    const filePath = path.join(__dirname, 'data', 'photos.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(rawData);

    for (let photo of data) {
      const { id, albumId, title, url, thumbnailUrl } = photo;
      const sql = `INSERT INTO Photos (id, albumId, title, url, thumbnailUrl) VALUES (?, ?, ?, ?, ?)`;
      const values = [id, albumId, title, url, thumbnailUrl];
      await pool.query(sql, values);
    }
    console.log("Seed bảng Photos thành công!");
  } catch (error) {
    console.error("Lỗi seed bảng Photos:", error);
  }
}

async function runSeed() {
  await seedUsers();
  await seedAlbums();
  await seedPhotos();
  console.log("Seed dữ liệu thành công!");
  process.exit(0);
}

runSeed();