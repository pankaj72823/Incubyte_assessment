import mongoose from 'mongoose';

const sweetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: 'uncategorized',
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be positive'],
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, 'Quantity cannot be negative'],
  },
});

const Sweet = mongoose.model('Sweet', sweetSchema);

export default Sweet;
