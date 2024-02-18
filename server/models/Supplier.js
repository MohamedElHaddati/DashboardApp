import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
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
export const Supplier = mongoose.model('supplier', supplierSchema,"Supplier");

