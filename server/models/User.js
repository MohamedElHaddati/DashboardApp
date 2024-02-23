import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // Validate email format
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  tel: String,
  password: {
    type: String,
    required: true,
    // Validate minimum password length
    validate: {
      validator: function(v) {
        return v.length >= 8;
      },
      message: props => `Password must be at least 8 characters long!`
    }
  },
  createdAt: {
    type: Date,
    default: new Date(),
  }
});

userSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 12);
  if (!this.id) {
    const count = await User.countDocuments();
    this.id = count + 1;
  }
  next();
});

export const User = mongoose.model('user', userSchema);
