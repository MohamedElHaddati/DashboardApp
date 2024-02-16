const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fournisseur'
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

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
