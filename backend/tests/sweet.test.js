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

afterEach(async () => {
  await Sweet.deleteMany();
});

describe('POST /api/sweets', () => {
  it('should create a sweet with valid data', async () => {
    const res = await request(app).post('/api/sweets').send({
      name: 'Gulab Jamun',
      category: 'dessert',
      price: 25,
      quantity: 50,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Gulab Jamun');
    expect(res.body._id).toBeDefined();

    const sweetInDb = await Sweet.findOne({ name: 'Gulab Jamun' });
    expect(sweetInDb).not.toBeNull();
  });

  it('should return 400 if name is missing', async () => {
    const res = await request(app).post('/api/sweets').send({
      category: 'dessert',
      price: 25,
      quantity: 50,
    });

    expect(res.statusCode).toBe(400);
  });

  it('should return 400 for negative price or quantity', async () => {
    const res = await request(app).post('/api/sweets').send({
      name: 'Kaju Katli',
      category: 'dessert',
      price: -10,
      quantity: -5,
    });

    expect(res.statusCode).toBe(400);
  });

  it('should return 400 for invalid data types', async () => {
    const res = await request(app).post('/api/sweets').send({
      name: 123,
      category: true,
      price: 'cheap',
      quantity: 'a lot',
    });

    expect(res.statusCode).toBe(400);
  });

  it('should handle long name and large values gracefully', async () => {
    const res = await request(app).post('/api/sweets').send({
      name: 'a'.repeat(1000),
      category: 'bulk',
      price: 999999,
      quantity: 999999,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.name.length).toBeGreaterThan(999);
  });
});
