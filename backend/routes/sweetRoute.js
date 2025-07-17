import express from 'express';
import { createSweet } from '../controllers/sweetController.js';

const router = express.Router();

router.post('/', createSweet);

export default router;
