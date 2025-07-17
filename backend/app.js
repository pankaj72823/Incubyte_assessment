import express from 'express';
import dotenv from 'dotenv';
import sweetRoutes from './routes/sweetRoute.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use('/api/sweets', sweetRoutes);

export default app;
