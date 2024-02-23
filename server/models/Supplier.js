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
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

supplierSchema.pre('save', async function(next) {
  if (!this.id) {
    const count = await Supplier.countDocuments();
    this.id = count + 1;
  }
  next();
});


export const Supplier = mongoose.model('supplier', supplierSchema);

