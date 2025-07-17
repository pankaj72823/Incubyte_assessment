import express from 'express';
import { getAllSweets, createSweet,deleteSweet } from '../controllers/sweet.controller.js';
import { searchSweetsHandler } from '../controllers/sweet.search.controller.js';
import { sortSweetsHandler } from '../controllers/sweet.sort.controller.js';

const router = express.Router();
router.get('/', getAllSweets);
router.post('/', createSweet);
router.delete('/:id', deleteSweet);
router.get('/search', searchSweetsHandler);
router.get('/sort', sortSweetsHandler);

export default router;
