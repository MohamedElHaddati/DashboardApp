import express from "express";
const router = express.Router();
import { createTransfer, getAllTransfers, getTransferById, updateTransfer, deleteTransfer } from '../controllers/TransferController.js';

router.post('/', createTransfer);
router.get('/', getAllTransfers);
router.get('/:id', getTransferById);
router.put('/:id', updateTransfer);
router.delete('/:id', deleteTransfer);

export {router};
