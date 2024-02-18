const mongoose = require('mongoose');

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
  }
});

export const Warehouse = mongoose.model('warehouse', warehouseSchema,"Warehouse");

