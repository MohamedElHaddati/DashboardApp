import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: String,
  tel: String,
  function: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date(),
  }
});

// Middleware to generate sequential IDs
employeeSchema.pre('save', async function(next) {
    if (!this.id) {
      const count = await Employee.countDocuments();
      this.id = count + 1;
    }
    next();
});

export const Employee = mongoose.model('employee', employeeSchema);
