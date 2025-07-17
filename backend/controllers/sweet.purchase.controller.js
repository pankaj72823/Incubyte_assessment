import Sweet from '../models/sweet.model.js';

export const purchaseSweet = async (req, res) => {
  const sweetId = req.params.id;
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ message: 'Quantity must be a positive number.' });
  }

  if (!sweetId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: 'Invalid sweet ID.' });
  }

  const sweet = await Sweet.findById(sweetId);

  if (!sweet) {
    return res.status(404).json({ message: 'Sweet not found.' });
  }

  if (sweet.quantity < quantity) {
    return res.status(400).json({ message: 'Not enough stock to complete purchase.' });
  }

  sweet.quantity -= quantity;
  await sweet.save();

  return res.status(200).json(sweet);
};
