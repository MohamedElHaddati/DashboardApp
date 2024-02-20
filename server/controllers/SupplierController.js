import { Supplier } from "../models/Supplier.js";

// Create a new supplier
export const createSupplier = async (req, res) => {
    try {
      const newSupplier = await Supplier.create(req.body);
      res.status(201).json(newSupplier);
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.name && error.keyPattern.email) {
        // Duplicate key error for the 'name' and 'email' combination
        res.status(400).json({ message: 'Supplier with the same name and email already exists' });
      } else {
        // Other errors
        res.status(400).json({ message: error.message });
      }
    }
  };

// Get all suppliers
export const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single supplier by ID
export const getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a supplier
export const updateSupplier = async (req, res) => {
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSupplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.status(200).json(updatedSupplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a supplier
export const deleteSupplier = async (req, res) => {
  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!deletedSupplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.status(200).json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
