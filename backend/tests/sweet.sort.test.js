import request from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';
import Sweet from '../models/sweet.model.js';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Sweet.deleteMany();
  await Sweet.insertMany([
    { name: 'Rasgulla', category: 'candy', price: 50, quantity: 10 },
    { name: 'Kaju Katli', category: 'pastry', price: 100, quantity: 5 },
    { name: 'Chocolate Barfi', category: 'chocolate', price: 70, quantity: 8 },
    { name: 'Gulab Jamun', category: 'candy', price: 80, quantity: 6 }
  ]);
});

describe('SORT Feature: GET /api/sweets/sort', () => {
  it('should return sweets sorted by price ascending', async () => {
    const res = await request(app).get('/api/sweets/sort?sort=price');
    expect(res.statusCode).toBe(200);
    const prices = res.body.map(s => s.price);
    expect([...prices]).toEqual([...prices].sort((a, b) => a - b));
  });

  it('should return sweets sorted by price descending', async () => {
    const res = await request(app).get('/api/sweets/sort?sort=-price');
    expect(res.statusCode).toBe(200);
    const prices = res.body.map(s => s.price);
    expect([...prices]).toEqual([...prices].sort((a, b) => b - a));
  });

  it('should return all sweets if sort param is not given', async () => {
    const res = await request(app).get('/api/sweets/sort');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
