import express from 'express';
import { createSweet,deleteSweet } from '../controllers/sweet.controller.js';

const router = express.Router();

router.post('/', createSweet);
router.delete('/:id', deleteSweet);

export default router;
