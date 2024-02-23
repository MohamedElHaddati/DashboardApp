import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
  }
});

userSchema.pre('save', async function(next) {
  if (!this.id) {
    const count = await User.countDocuments();
    this.id = count + 1;
  }
  next();
});

export const User = mongoose.model('user', userSchema);
