import express from 'express';
import { getAllSweets, createSweet,deleteSweet } from '../controllers/sweet.controller.js';

const router = express.Router();
router.get('/', getAllSweets);
router.post('/', createSweet);
router.delete('/:id', deleteSweet);

export default router;
