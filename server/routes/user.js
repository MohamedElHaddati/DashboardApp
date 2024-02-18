import express from "express";
const router = express.Router();
import {deleteUser,updateUser,getUserById,getAllUsers,createUser} from '../controllers/user.js'

export const creatUser = router.post('/user', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);



