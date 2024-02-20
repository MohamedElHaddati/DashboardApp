import { Warehouse } from "../models/Warehouse.js";

// Create a new warehouse
export const createWarehouse = async (req, res) => {
  try {
    const newWarehouse = await Warehouse.create(req.body);
    res.status(201).json(newWarehouse);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.name && error.keyPattern.location) {
      // Duplicate key error for the 'name' and 'location' combination
      res.status(400).json({ message: 'Warehouse with the same name and location already exists' });
    } else {
      // Other errors
      res.status(400).json({ message: error.message });
    }
  }
};

// Get all warehouses
export const getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.find();
    res.status(200).json(warehouses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single warehouse by ID
export const getWarehouseById = async (req, res) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    if (!warehouse) {
      return res.status(404).json({ message: 'Warehouse not found' });
    }
    res.status(200).json(warehouse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a warehouse
export const updateWarehouse = async (req, res) => {
  try {
    const updatedWarehouse = await Warehouse.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedWarehouse) {
      return res.status(404).json({ message: 'Warehouse not found' });
    }
    res.status(200).json(updatedWarehouse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a warehouse
export const deleteWarehouse = async (req, res) => {
  try {
    const deletedWarehouse = await Warehouse.findByIdAndDelete(req.params.id);
    if (!deletedWarehouse) {
      return res.status(404).json({ message: 'Warehouse not found' });
    }
    res.status(200).json({ message: 'Warehouse deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
