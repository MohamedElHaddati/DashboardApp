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
    const lastUser = await User.findOne({}, {}, { sort: { 'id': -1 } }); // Find the user with the highest id
    if (lastUser) {
      this.id = lastUser.id + 1; // Increment the id
    } else {
      this.id = 1; // If there are no users yet, start with 1
    }
  }
  next();
});

export const User = mongoose.model('user', userSchema);
