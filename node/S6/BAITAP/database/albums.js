const pool = require('./database');

async function getAlbums({ userId, page, limit, sort, order }) {
  let sql = 'SELECT * FROM albums';
  const params = [];
  const where = [];

  if (userId) {
    where.push('userId = ?');
    params.push(userId);
  }

  if (where.length > 0) {
    sql += ' WHERE ' + where.join(' AND ');
  }

  if (sort) {
    order = order && order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    sql += ` ORDER BY ${sort} ${order}`;
  }

  if (page && limit) {
    const offset = (page - 1) * limit;
    sql += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));
  }

  const [rows] = await pool.query(sql, params);
  return rows;
}

async function getAlbumById(id) {
  const [rows] = await pool.query('SELECT * FROM albums WHERE id = ?', [id]);
  return rows[0];
}

async function getAlbumByTitle(title) {
  const [rows] = await pool.query('SELECT * FROM albums WHERE title = ?', [title]);
  return rows[0];
}

async function createAlbum(albumData) {
  const { userId, title } = albumData;
  const sql = 'INSERT INTO albums (userId, title) VALUES (?, ?)';
  const params = [userId, title];
  const [result] = await pool.query(sql, params);
  return result.insertId;
}

async function updateAlbum(id, albumData) {
  const { userId, title } = albumData;
  const sql = 'UPDATE albums SET userId = ?, title = ? WHERE id = ?';
  const params = [userId, title, id];
  const [result] = await pool.query(sql, params);
  return result.affectedRows;
}

async function deleteAlbum(id) {
  const [result] = await pool.query('DELETE FROM albums WHERE id = ?', [id]);
  return result.affectedRows;
}

// Lấy danh sách album theo userId với phân trang, sắp xếp
async function getAlbumsByUserId(userId, { page, limit, sort, order }) {
  let sql = 'SELECT * FROM albums WHERE userId = ?';
  const params = [userId];

  if (sort) {
    order = order && order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    sql += ` ORDER BY ${sort} ${order}`;
  }

  if (page && limit) {
    const offset = (page - 1) * limit;
    sql += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));
  }

  const [rows] = await pool.query(sql, params);
  return rows;
}

module.exports = {
  getAlbums,
  getAlbumById,
  getAlbumByTitle,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  getAlbumsByUserId,
};