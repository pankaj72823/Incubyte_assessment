import express from 'express';
import dotenv from 'dotenv';
import sweetRoutes from './routes/sweet.route.js';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/sweets', sweetRoutes);

export default app;
