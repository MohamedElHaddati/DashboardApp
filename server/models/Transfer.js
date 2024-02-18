import mongoose from "mongoose";

const transferSchema = new mongoose.Schema({
  warehouse_src: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Warehouse',
    required: true
  },
  warehouse_dest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Warehouse',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Produit'
    },
    quantity: {
      type: Number,
      required: true,
      default: 0
    }
  }]
});

export const Transfer = mongoose.model('transfer', transferSchema,"Transfer");

