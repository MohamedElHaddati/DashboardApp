import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
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

saleSchema.pre('save', async function(next) {
  if (!this.id) {
    const count = await Sale.countDocuments();
    this.id = count + 1;
  }
  next();
});

export const Sale = mongoose.model('sale', saleSchema);


