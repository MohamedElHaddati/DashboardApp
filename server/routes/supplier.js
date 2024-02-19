import express from "express";
const router = express.Router();
import { createSupllier, getAllSuplliers, getSupllierById, updateSupllier, deleteSupllier } from '../controllers/SupllierController.js';

router.post('/', createSupllier);
router.get('/', getAllSuplliers);
router.get('/:id', getSupllierById);
router.put('/:id', updateSupllier);
router.delete('/:id', deleteSupllier);

export {router};
