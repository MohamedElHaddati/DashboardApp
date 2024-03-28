import { User } from "../models/User.js";

// Create a new user
export const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    // Extract pagination parameters from query string
    const { page = 1, limit = 10 } = req.query;

    // Convert page and limit to integers
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Calculate the number of documents to skip
    const skip = (pageNumber - 1) * limitNumber;

    // Fetch users from the database with pagination
    const users = await User.find().skip(skip).limit(limitNumber);

    // Return the paginated users
    res.json(users);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
};

// Function to get the latest 5 users sorted by newest
export const getLatestUsers = async (req, res) => {
  try {
    // Fetch latest 5 users from the database sorted by newest
    const users = await User.find().sort({ createdAt: -1 }).limit(5);

    // Return the latest users
    res.json(users);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
};

// Get a single user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get information about the currently logged-in user
export const getCurrentUser = async (req, res) => {
  try {
    // Extract the user ID from the token (assuming it's stored in the token)
    const userId = req.user.id;

    // Fetch the user information based on the user ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user information
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
