import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
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

export const Product = mongoose.model('product', productSchema,"Product");


