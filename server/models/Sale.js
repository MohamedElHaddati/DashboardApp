const mongoose = require('mongoose');

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

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
