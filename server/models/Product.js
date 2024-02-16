const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
    },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categorie',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  brand: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  }
});

const Produit = mongoose.model('Produit', produitSchema);

module.exports = Produit;
