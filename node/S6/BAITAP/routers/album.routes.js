const express = require('express');
const router = express.Router();

const {
  getAlbums,
  getAlbumById,
  getAlbumByTitle,
  createAlbum,
  updateAlbum,
  deleteAlbum,
} = require('../database/albums');

// GET /api/v1/albums?userId=...&page=...&limit=...&sort=...&order=...
router.get('/', async (req, res, next) => {
  try {
    const { userId, page, limit, sort, order } = req.query;
    const albums = await getAlbums({ userId, page, limit, sort, order });
    res.json(albums);
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/albums/:id
router.get('/:id', async (req, res, next) => {
  try {
    const album = await getAlbumById(req.params.id);
    if (!album) return res.status(404).json({ message: 'Album not found' });
    res.json(album);
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/albums
// Nếu album có title đã tồn tại thì trả về "Album already exists"
router.post('/', async (req, res, next) => {
  try {
    const { title } = req.body;
    const existingAlbum = await getAlbumByTitle(title);
    if (existingAlbum) {
      return res.json({ message: 'Album already exists' });
    }
    await createAlbum(req.body);
    res.json({ message: 'Create successfully' });
  } catch (error) {
    next(error);
  }
});

// PUT /api/v1/albums/:id
router.put('/:id', async (req, res, next) => {
  try {
    const album = await getAlbumById(req.params.id);
    if (!album) return res.status(404).json({ message: 'Album not found' });
    await updateAlbum(req.params.id, req.body);
    res.json({ message: 'Update successfully' });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/v1/albums/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const album = await getAlbumById(req.params.id);
    if (!album) return res.status(404).json({ message: 'Album not found' });
    await deleteAlbum(req.params.id);
    res.json({ message: 'Delete successfully' });
  } catch (error) {
    next(error);
  }
});

// Nested endpoint: GET /api/v1/albums/:id/photos
const { getPhotosByAlbumId } = require('../database/photos');
router.get('/:id/photos', async (req, res, next) => {
  try {
    const { page, limit, sort, order } = req.query;
    const photos = await getPhotosByAlbumId(req.params.id, { page, limit, sort, order });
    res.json(photos);
  } catch (error) {
    next(error);
  }
});

module.exports = router;