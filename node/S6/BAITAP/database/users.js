const pool = require('./database');

async function getUsers({ interests, page, limit, sort, order }) {
  let sql = 'SELECT * FROM users';
  const params = [];
  const where = [];

  // Nếu có filter theo interests (giả sử interests được lưu dưới dạng JSON string)
  if (interests && interests.length > 0) {
    interests.forEach(interest => {
      where.push(`interests LIKE ?`);
      params.push(`%${interest}%`);
    });
  }

  if (where.length > 0) {
    sql += ' WHERE ' + where.join(' AND ');
  }

  // Sắp xếp (sort)
  if (sort) {
    order = order && order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    sql += ` ORDER BY ${sort} ${order}`;
  }

  // Phân trang (pagination)
  if (page && limit) {
    const offset = (page - 1) * limit;
    sql += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));
  }

  const [rows] = await pool.query(sql, params);
  return rows;
}

async function getUserById(id) {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
}

async function getUserByEmail(email) {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
}

async function createUser(userData) {
  const { name, username, email, address, phone, website, company, interests } = userData;
  const sql = 'INSERT INTO users (name, username, email, address, phone, website, company, interests) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const params = [
    name,
    username,
    email,
    JSON.stringify(address),
    phone,
    website,
    JSON.stringify(company),
    JSON.stringify(interests)
  ];
  const [result] = await pool.query(sql, params);
  return result.insertId;
}

async function updateUser(id, userData) {
  const { name, username, email, address, phone, website, company, interests } = userData;
  const sql = 'UPDATE users SET name = ?, username = ?, email = ?, address = ?, phone = ?, website = ?, company = ?, interests = ? WHERE id = ?';
  const params = [
    name,
    username,
    email,
    JSON.stringify(address),
    phone,
    website,
    JSON.stringify(company),
    JSON.stringify(interests),
    id
  ];
  const [result] = await pool.query(sql, params);
  return result.affectedRows;
}

async function deleteUser(id) {
  const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
  return result.affectedRows;
}

module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};