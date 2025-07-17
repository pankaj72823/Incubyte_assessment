import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
import Sweet from '../models/sweet.model.js';
import { jest } from '@jest/globals';


beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterEach(async () => {
  await Sweet.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('GET /api/sweets', () => {
  it('should return an empty array when no sweets are present', async () => {
    const res = await request(app).get('/api/sweets');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('should return a list of sweets when sweets exist', async () => {
    await Sweet.create([
        { name: 'Ladoo', category: 'candy', price: 10, quantity: 50 },
        { name: 'Barfi', category: 'pastry', price: 20, quantity: 30 },
    ]);

    const res = await request(app).get('/api/sweets');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);

    const sweetNames = res.body.map((sweet) => sweet.name);
    expect(sweetNames).toEqual(expect.arrayContaining(['Ladoo', 'Barfi']));
});

    it('should return 500 if there is a server error', async () => {
    jest.spyOn(Sweet, 'find').mockImplementation(() => {
      throw new Error('DB error');
    });

    const res = await request(app).get('/api/sweets');
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('error', 'Failed to fetch sweets');

    Sweet.find.mockRestore(); 
  });
});
