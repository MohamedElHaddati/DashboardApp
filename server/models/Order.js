import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'supplier'
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product'
    },
    quantity: {
      type: Number,
      default: 1
    }
  }],
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }
});

export const Order = mongoose.model('order', orderSchema);


