import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
import Sweet from '../models/sweet.model.js';
import { jest } from '@jest/globals';

describe('DELETE /api/sweets/:id', () => {
  let sweetId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  beforeEach(async () => {
    const sweet = await Sweet.create({ name: 'Kaju Katli', price: 120, quantity: 30 });
    sweetId = sweet._id.toString();
  });

  afterEach(async () => {
    await Sweet.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('should delete sweet with valid ID and return 200', async () => {
    const res = await request(app).delete(`/api/sweets/${sweetId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Sweet deleted successfully');
  });

  test('should return 404 if sweet does not exist', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).delete(`/api/sweets/${fakeId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Sweet not found');
  });

  test('should return 400 for invalid ID format', async () => {
    const res = await request(app).delete('/api/sweets/invalid-id');
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Invalid sweet ID');
  });

  test('should return 500 on server error', async () => {
    jest.spyOn(Sweet, 'findByIdAndDelete').mockImplementationOnce(() => {
      throw new Error('Unexpected error');
    });

    const res = await request(app).delete(`/api/sweets/${sweetId}`);
    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe('Internal server error');
  });
});
