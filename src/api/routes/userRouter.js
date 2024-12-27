import { Router } from "express";
import { createUser, deleteUser, updateUser, getUsers, login } from "../controllers/userController.js";

const router = Router()

router.get('/all', getUsers)
router.post('', createUser)
router.post('/login', login)
router.put('', updateUser)
router.delete('/:userId', deleteUser)

export default router