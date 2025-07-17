import { restockSweetService } from '../services/sweet.restock.service.js';

export const restockSweet = async (req, res) => {
  try {
    const updatedSweet = await restockSweetService(req.params.id, req.body.quantity);
    res.status(200).json(updatedSweet);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
  }
};
