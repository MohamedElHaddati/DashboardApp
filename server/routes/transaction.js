import express from "express";
const router = express.Router();
import { createTransaction, getAllTransactions, getTransactionById, updateTransaction, deleteTransaction } from '../controllers/TransactionController.js';

router.post('/', createTransaction);
router.get('/', getAllTransactions);
router.get('/:id', getTransactionById);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

export {router};
