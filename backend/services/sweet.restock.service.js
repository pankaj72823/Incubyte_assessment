import Sweet from '../models/sweet.model.js';

export const restockSweetService = async (sweetId, quantity) => {
  if (!quantity || quantity <= 0) {
    const error = new Error('Quantity must be a positive number.');
    error.status = 400;
    throw error;
  }

  if (!sweetId.match(/^[0-9a-fA-F]{24}$/)) {
    const error = new Error('Invalid sweet ID.');
    error.status = 400;
    throw error;
  }

  const sweet = await Sweet.findById(sweetId);
  if (!sweet) {
    const error = new Error('Sweet not found.');
    error.status = 404;
    throw error;
  }

  sweet.quantity += quantity;
  return await sweet.save();
};
