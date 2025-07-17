import Sweet from '../models/sweetModel.js';

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
