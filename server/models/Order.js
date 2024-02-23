import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
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

orderSchema.pre('save', async function(next) {
  if (!this.id) {
    const count = await Order.countDocuments();
    this.id = count + 1;
  }
  next();
});

export const Order = mongoose.model('order', orderSchema);


