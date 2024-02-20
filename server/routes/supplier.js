import express from "express";
const router = express.Router();
import { createSupplier, getAllSuppliers, getSupplierById, updateSupplier, deleteSupplier } from '../controllers/SupplierController.js';

router.post('/', createSupplier);
router.get('/', getAllSuppliers);
router.get('/:id', getSupplierById);
router.put('/:id', updateSupplier);
router.delete('/:id', deleteSupplier);

export {router};
