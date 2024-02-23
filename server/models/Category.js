import mongoose, { model } from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  }
});

export const Category = mongoose.model('category', categorySchema);

