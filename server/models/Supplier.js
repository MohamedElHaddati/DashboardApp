const mongoose = require('mongoose');

const fournisseurSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  tel: {
    type: String
  },
  email: {
    type: String
  },
  address: {
    type: String
  }
});

const Fournisseur = mongoose.model('Fournisseur', fournisseurSchema);

module.exports = Fournisseur;
