import { sortSweets } from '../services/sweet.service.js';

export const sortSweetsHandler = async (req, res) => {
  try {
    const result = await sortSweets(req.query.sort);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Sorting failed', error: err.message });
  }
};