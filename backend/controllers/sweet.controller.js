import { addSweet } from '../services/sweet.service.js';
import * as sweetService from '../services/sweet.service.js';
import mongoose from 'mongoose'; 
import Sweet from '../models/sweet.model.js';

export const createSweet = async (req, res) => {
  try {
    const sweet = await addSweet(req.body);
    res.status(201).json(sweet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteSweet = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid sweet ID' });
    }

    const deleted = await sweetService.deleteSweet(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    res.status(200).json({ message: 'Sweet deleted successfully' });
  } catch (err) {
    console.error('Error deleting sweet:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.status(200).json(sweets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sweets' });
  }
};
