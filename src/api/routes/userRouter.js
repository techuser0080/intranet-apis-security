import { Router } from "express";
import { createUser, deleteUser, updateUser, getUsers, login, logout, getCompaniesByUserId, getCompanies, getRolesByCompanyId } from "../controllers/userController.js";
import { loginValidation } from "../validations/auth.js";
import { createUserValidation, deleteUserValidation, updateUserValidation } from "../validations/userValidation.js";

const router = Router()

router.get('/all', getUsers)
router.get('/:userId/companies', getCompaniesByUserId)
router.get('/companies', getCompanies)
router.get('/company/:companyId/roles', getRolesByCompanyId)

router.post('', createUserValidation, createUser)
router.post('/login', login)
router.post('/logout', logout)
router.put('/:userId', updateUserValidation, updateUser)
router.delete('/:userId', deleteUserValidation, deleteUser)

export default router