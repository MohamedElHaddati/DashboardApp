import mongoose from "mongoose";

const transferSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
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

transferSchema.pre('save', async function(next) {
  if (!this.id) {
    const count = await Transfer.countDocuments();
    this.id = count + 1;
  }
  next();
});

export const Transfer = mongoose.model('transfer', transferSchema);

