import { Router } from "express";
import { createUser, deleteUser, updateUser, getUsers, login } from "../controllers/userController.js";
import { loginValidation } from "../validations/auth.js";

const router = Router()

router.get('/all', getUsers)
router.post('', createUser)
router.post('/login', loginValidation, login)
router.post('/logout', logout)
router.put('', updateUser)
router.delete('/:userId', deleteUser)

export default router