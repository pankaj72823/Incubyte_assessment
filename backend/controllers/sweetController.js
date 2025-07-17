import { addSweet } from '../services/sweetService.js';

export const createSweet = async (req, res) => {
  try {
    const sweet = await addSweet(req.body);
    res.status(201).json(sweet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
