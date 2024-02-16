const mongoose = require('mongoose');

const transfertSchema = new mongoose.Schema({
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

const Transfert = mongoose.model('Transfert', transfertSchema);

module.exports = Transfert;
