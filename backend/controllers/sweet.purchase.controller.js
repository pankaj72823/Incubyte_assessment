import { purchaseSweetService } from '../services/sweet.purchase.service.js';

export const purchaseSweet = async (req, res) => {
  try {
    const updatedSweet = await purchaseSweetService(req.params.id, req.body.quantity);
    res.status(200).json(updatedSweet);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
  }
};
