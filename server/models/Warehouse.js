import mongoose from "mongoose";

const warehouseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Produit'
    },
    quantity: {
      type: Number,
      default: 0
    }
  }],
  capacity: {
    type: Number,
    required: true
  },
  type: {
    type: String
  },
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }]
});

warehouseSchema.pre('save', async function(next) {
  if (!this.id) {
    const count = await Warehouse.countDocuments();
    this.id = count + 1;
  }
  next();
});

export const Warehouse = mongoose.model('warehouse', warehouseSchema);

