import mongoose, { model } from "mongoose";

const categorieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

export const Categorie = mongoose.model('categorie', categorieSchema,"Category");

