import { searchSweets } from '../services/sweet.service.js';

export const searchSweetsHandler = async (req, res) => {
  try {
    const result = await searchSweets(req.query);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Search failed', error: err.message });
  }
};