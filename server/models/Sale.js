import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
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
      default: 1
    }
  }]
});

export const Sale = mongoose.model('sale', saleSchema);


