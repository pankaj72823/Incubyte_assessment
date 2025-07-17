import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
import Sweet from '../models/sweet.model.js';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
});

beforeEach(async () => {
  await Sweet.deleteMany({});
});

describe('POST /api/sweets/:id/restock', () => {
  it('should restock sweet with valid quantity', async () => {
    const sweet = await Sweet.create({ name: 'Peda', category: 'Milk', price: 20, quantity: 5 });

    const res = await request(app)
      .post(`/api/sweets/${sweet._id}/restock`)
      .send({ quantity: 3 });

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(8);
  });

  it('should allow restocking with quantity = 1', async () => {
    const sweet = await Sweet.create({ name: 'Soan Papdi', category: 'Flaky', price: 10, quantity: 1 });

    const res = await request(app)
      .post(`/api/sweets/${sweet._id}/restock`)
      .send({ quantity: 1 });

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(2);
  });

  it('should return 400 if quantity is missing', async () => {
    const sweet = await Sweet.create({ name: 'Mysore Pak', category: 'South Indian', price: 25, quantity: 10 });

    const res = await request(app)
      .post(`/api/sweets/${sweet._id}/restock`)
      .send({});

    expect(res.status).toBe(400);
  });

  it('should return 400 if quantity is zero or negative', async () => {
    const sweet = await Sweet.create({ name: 'Halwa', category: 'North Indian', price: 30, quantity: 8 });

    const res = await request(app)
      .post(`/api/sweets/${sweet._id}/restock`)
      .send({ quantity: -2 });

    expect(res.status).toBe(400);
  });

  it('should return 400 for invalid sweet ID', async () => {
    const res = await request(app)
      .post('/api/sweets/invalid-id/restock')
      .send({ quantity: 5 });

    expect(res.status).toBe(400);
  });

  it('should return 404 if sweet not found', async () => {
    const fakeId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .post(`/api/sweets/${fakeId}/restock`)
      .send({ quantity: 2 });

    expect(res.status).toBe(404);
  });
});
