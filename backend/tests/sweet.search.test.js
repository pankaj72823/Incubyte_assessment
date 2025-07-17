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

describe('SEARCH Feature: GET /api/sweets/search', () => {
  it('should return sweets matching the name', async () => {
    const res = await request(app).get('/api/sweets/search?name=Rasgulla');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Rasgulla');
  });

  it('should return sweets in the given category', async () => {
    const res = await request(app).get('/api/sweets/search?category=candy');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body.every(s => s.category === 'candy')).toBe(true);
  });

  it('should return sweets in the specified price range', async () => {
    const res = await request(app).get('/api/sweets/search?minPrice=60&maxPrice=80');
    expect(res.statusCode).toBe(200);
    const prices = res.body.map(s => s.price);
    expect(prices.every(p => p >= 60 && p <= 80)).toBe(true);
  });

  it('should return empty array if no match found', async () => {
    const res = await request(app).get('/api/sweets/search?name=NonExistentSweet');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
});
