import express from "express";
const router = express.Router();
import { createUser, getAllUsers, getUserById, updateUser, deleteUser , getCurrentUser } from '../controllers/UserController.js';

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/signed-in', getCurrentUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export {router};
