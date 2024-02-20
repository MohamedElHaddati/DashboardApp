import { Category } from "../models/Category.js";

// Create a new category
export const createCategory = async (req, res) => {
    try {
      // Attempt to create the category
      const newCategory = await Category.create(req.body);
      res.status(201).json(newCategory);
    } catch (error) {
      // Check if the error is a duplicate key error
      if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
        // Duplicate key error for the 'name' field
        res.status(400).json({ message: 'Category with the same name already exists' });
      } else {
        // Other errors
        res.status(400).json({ message: error.message });
      }
    }
  };
  

// Get all Categories
export const getAllCategories = async (req, res) => {
  try {
    const Categories = await Category.find();
    res.status(200).json(Categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a category
export const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
