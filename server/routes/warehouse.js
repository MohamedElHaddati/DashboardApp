import express from "express";
const router = express.Router();
import { createWarehouse, getAllWarehouses, getWarehouseById, updateWarehouse, deleteWarehouse } from '../controllers/WarehouseController.js';

router.post('/', createWarehouse);
router.get('/', getAllWarehouses);
router.get('/:id', getWarehouseById);
router.put('/:id', updateWarehouse);
router.delete('/:id', deleteWarehouse);

export {router};
