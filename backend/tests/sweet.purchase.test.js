import request from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';
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

describe('POST /api/sweets/:id/purchase', () => {
  it('should purchase a sweet when enough stock is available', async () => {
    const sweet = await Sweet.create({
      name: 'Ladoo',
      category: 'Indian',
      price: 20,
      quantity: 10
    });

    const res = await request(app)
      .post(`/api/sweets/${sweet._id}/purchase`)
      .send({ quantity: 3 });

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(7);
  });

  it('should allow purchase equal to stock and set stock to 0', async () => {
    const sweet = await Sweet.create({ name: 'Barfi', category: 'Indian', price: 30, quantity: 5 });

    const res = await request(app)
      .post(`/api/sweets/${sweet._id}/purchase`)
      .send({ quantity: 5 });

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(0);
  });

  it('should return 400 if purchase quantity exceeds stock', async () => {
    const sweet = await Sweet.create({ name: 'Kaju Katli', category: 'Indian', price: 40, quantity: 2 });

    const res = await request(app)
      .post(`/api/sweets/${sweet._id}/purchase`)
      .send({ quantity: 5 });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/not enough stock/i);
  });

  it('should return 400 for invalid sweet ID', async () => {
    const res = await request(app)
      .post('/api/sweets/invalid-id/purchase')
      .send({ quantity: 1 });

    expect(res.status).toBe(400);
  });

  it('should return 404 if sweet not found', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .post(`/api/sweets/${nonExistentId}/purchase`)
      .send({ quantity: 1 });

    expect(res.status).toBe(404);
  });

  it('should return 400 if quantity is missing', async () => {
    const sweet = await Sweet.create({ name: 'Rasgulla', category: 'Bengali', price: 25, quantity: 10 });

    const res = await request(app)
      .post(`/api/sweets/${sweet._id}/purchase`)
      .send({});

    expect(res.status).toBe(400);
  });

  it('should return 400 if quantity is zero or negative', async () => {
    const sweet = await Sweet.create({ name: 'Gulab Jamun', category: 'Indian', price: 15, quantity: 10 });

    const res = await request(app)
      .post(`/api/sweets/${sweet._id}/purchase`)
      .send({ quantity: -1 });

    expect(res.status).toBe(400);
  });
});
