import { Router } from "express";
import { pool } from "../../config/database";
import { createUser, deleteUser, updateUser, users } from "../controllers/userController";

const router = Router()

router.get('/user/all', users)
router.post('/user', createUser)
router.put('/user', updateUser)
router.delete('/user/{userId}', deleteUser)

export default router