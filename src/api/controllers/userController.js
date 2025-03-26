import { getUsersService, getUserByIdService, createUserService, updateUserService, deleteUserService, getUserByEmailService, getCompaniesByUserIdService, getCompaniesService, assignRoleToUserService, getRolesByCompanyIdService, getRolesByUserIdService } from "../services/userService.js"
import { jwtSign } from "../middlewares/jwtMiddleware.js"
import bcrypt from 'bcrypt'
import { Constants } from "../../config/constants.js"
import { responseBody } from "../../config/responseEntity.js"
import { response } from "express"

export const getUsers = async(req, res) => {
    try {
        const rows = await getUsersService()
        if (rows == null) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        if (rows.length <= 0) return res.status(200).send(responseBody(3, Constants.MESSAGE_NO_RESULTS_FOUND, null))
        return res.status(200).send(responseBody(1, Constants.MESSAGE_STATUS_OK, rows))
    } catch (error) {
        res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
    }
}

export const getUserById = async(req, res) => {
    try {
        const userId = req.params.userId
        const rows = await getUserByIdService(userId)
        if (rows == null) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        if (rows.length <= 0) return res.status(200).send(responseBody(3, Constants.MESSAGE_NO_RESULTS_FOUND, null))
        return res.status(200).send(responseBody(1, Constants.MESSAGE_STATUS_OK, rows[0]))
    } catch (error) {
        res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
    }
}

export const getCompaniesByUserId = async(req, res) => {
    try {
        const userId = req.params.userId
        const rows = await getCompaniesByUserIdService(userId)
        if (rows == null) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        if (rows.length <= 0) return res.status(200).send(responseBody(3, Constants.MESSAGE_NO_RESULTS_FOUND, null))
        return res.status(200).send(responseBody(1, Constants.MESSAGE_STATUS_OK, rows))
    } catch (error) {
        res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
    }
}

export const getRolesByCompanyId = async(req, res) => {
    try {
        const companyId = req.params.companyId
        const rows = await getRolesByCompanyIdService(companyId)
        if (rows == null) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        if (rows.length <= 0) return res.status(200).send(responseBody(3, Constants.MESSAGE_NO_RESULTS_FOUND, null))
        return res.status(200).send(responseBody(1, Constants.MESSAGE_STATUS_OK, rows))
    } catch (error) {
        res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
    }
}

export const getCompanies = async(req, res) => {
    try {
        const rows = await getCompaniesService()
        if (rows == null) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        if (rows.length <= 0) return res.status(200).send(responseBody(3, Constants.MESSAGE_NO_RESULTS_FOUND, null))
        return res.status(200).send(responseBody(1, Constants.MESSAGE_STATUS_OK, rows))
    } catch (error) {
        res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
    }
}

export const getUserByEmail = async(req, res) => {
    try {
        const email = req.params.email
        const rows = await getUserByEmailService(email)
        if (rows == null) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        if (rows.length <= 0) return res.status(200).send(responseBody(3, Constants.MESSAGE_NO_RESULTS_FOUND, null))
        return res.status(200).send(responseBody(1, Constants.MESSAGE_STATUS_OK, rows[0]))
    } catch (error) {
        res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
    }
}

export const createUser = async(req, res) => {
    try {
        const { name, lastName, email, password, age, gender, roleId } = req.body
        const userObject = await getUserByEmailService(email)
        if (userObject != null) return res.status(200).send(responseBody(2, Constants.MESSAGE_USER_ALREADY_EXISTS, null))
        const hashedPassword = await bcrypt.hash(password, 10)
        const { result } = await createUserService(name, lastName, email, hashedPassword, gender, age)
        if (result == null) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        if (result == 0) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        const { resultAssign } = await assignRoleToUserService(result, roleId)
        if (resultAssign == null) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        if (resultAssign != 1) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        return res.status(200).send(responseBody(1, Constants.MESSAGE_STATUS_OK, null))
    } catch (error) {
        res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
    }
}

export const login = async(req, res) => {
    try {
        const { email, password } = req.body
        const userObject = await getUserByEmailService(email)
        if (userObject == null) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        if (userObject == {}) return res.status(200).send(responseBody(3, Constants.MESSAGE_USER_EMAIL_DOESNT_EXISTS , null))
        const isValid = await bcrypt.compare(password, userObject.password)
        if (!isValid) return res.status(200).send(responseBody(2, Constants.MESSAGE_LOGIN_INVALID_PASSWORD, null))
        const rows = await getRolesByUserIdService(userObject.userId)
        userObject.password = Constants.STRING_EMPTY
        const token = jwtSign(userObject)
        userObject.token = token
        userObject.rol = rows[0].description
        res.status(200).cookie(Constants.COOKIE_SECURITY_NAME, token, {
            httpOnly: true,
            secure: process.env.ENV == 'prod' ? true : false,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60
        }).send(responseBody(1, Constants.MESSAGE_STATUS_OK, userObject))
    } catch (error) {
        console.log(error)
        res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
    }
}

export const logout = (req, res) => {
    res.clearCookie(Constants.COOKIE_SECURITY_NAME).json('ok')
}

export const updateUser = async(req, res) => {
    try {
        const { userId } = req.params
        const { name, lastName, email, gender, age } = req.body
        const { result } = await updateUserService(name, lastName, email, gender, age, userId)
        if (result == null) return res.status(500).send(response(2, Constants.MESSAGE_STATUS_ERROR, null))
        if (result != 1) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        return res.status(200).send(responseBody(1, Constants.MESSAGE_STATUS_OK, null))
    } catch (error) {
        res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
    }
}

export const deleteUser = async(req, res) => {
    try {
        const { userId } = req.params
        const { result } = await deleteUserService(userId)
        if (result == null) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        if (result == 2) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        return res.status(200).send(responseBody(1, Constants.MESSAGE_STATUS_OK, null))
    } catch (error) {
        res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
    }
}