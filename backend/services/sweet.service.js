import Sweet from '../models/sweet.model.js';

export const addSweet = async (data) => {
  if (!data.name || !data.price || !data.quantity) {
    throw new Error('Missing required fields');
  }

  if (typeof data.price !== 'number' || data.price < 0) {
    throw new Error('Invalid price');
  }

  if (typeof data.quantity !== 'number' || data.quantity < 0) {
    throw new Error('Invalid quantity');
  }

  const sweet = new Sweet(data);
  return await sweet.save();
};

export const deleteSweet = async (id) => {
  const sweet = await Sweet.findByIdAndDelete(id);
  return sweet;
};

export const getAllSweets = async () => {
  return await Sweet.find();
};


export const searchSweets = async (query) => {
  const { name, category, minPrice, maxPrice } = query;
  const filter = {};

  if (name) filter.name = new RegExp(name, 'i');
  if (category) filter.category = category;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  return await Sweet.find(filter);
};

export const sortSweets = async (sortParam) => {
  const sort = {};
  if (sortParam) {
    const field = sortParam.replace('-', '');
    const direction = sortParam.startsWith('-') ? -1 : 1;
    sort[field] = direction;
  }

  return await Sweet.find().sort(sort);
};