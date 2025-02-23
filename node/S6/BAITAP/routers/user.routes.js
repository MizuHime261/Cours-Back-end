const express = require('express');
const router = express.Router();

const {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
} = require('../database/users');

// GET /api/v1/users?interests[]=...&page=...&limit=...&sort=...&order=...
router.get('/', async (req, res, next) => {
  try {
    const { interests, page, limit, sort, order } = req.query;
    // Nếu chỉ có 1 giá trị, đảm bảo dạng mảng:
    const interestsArr = interests
      ? Array.isArray(interests) ? interests : [interests]
      : undefined;
    const users = await getUsers({ interests: interestsArr, page, limit, sort, order });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/users/:id
router.get('/:id', async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/users
// Nếu email đã tồn tại thì báo "User already exists"
router.post('/', async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.json({ message: 'User already exists' });
    }
    await createUser(req.body);
    res.json({ message: 'Create successfully' });
  } catch (error) {
    next(error);
  }
});

// PUT /api/v1/users/:id
router.put('/:id', async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await updateUser(req.params.id, req.body);
    res.json({ message: 'Update successfully' });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/v1/users/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await deleteUser(req.params.id);
    res.json({ message: 'Delete successfully' });
  } catch (error) {
    next(error);
  }
});

// Nested endpoint: GET /api/v1/users/:id/albums
const { getAlbumsByUserId } = require('../database/albums');
router.get('/:id/albums', async (req, res, next) => {
  try {
    const { page, limit, sort, order } = req.query;
    const albums = await getAlbumsByUserId(req.params.id, { page, limit, sort, order });
    res.json(albums);
  } catch (error) {
    next(error);
  }
});

module.exports = router;