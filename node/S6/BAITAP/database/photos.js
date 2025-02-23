const pool = require('./database');

async function getPhotosByAlbumId(albumId, { page, limit, sort, order }) {
  let sql = 'SELECT * FROM photos WHERE albumId = ?';
  const params = [albumId];

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
  getPhotosByAlbumId,
};