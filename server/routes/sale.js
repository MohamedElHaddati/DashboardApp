import express from "express";
const router = express.Router();
import { createSale, getAllSales, getSaleById, updateSale, deleteSale } from '../controllers/SaleController.js';

router.post('/', createSale);
router.get('/', getAllSales);
router.get('/:id', getSaleById);
router.put('/:id', updateSale);
router.delete('/:id', deleteSale);

export {router};
