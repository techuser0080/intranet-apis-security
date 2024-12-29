import { getUsersService, getUserByIdService, createUserService, updateUserService, deleteUserService, getUserByEmailService } from "../services/userService.js"
import { jwtSign } from "../middlewares/jwtMiddleware.js"
import bcrypt from 'bcrypt'
import { Constants } from "../../config/constants.js"
import { responseBody } from "../../config/responseEntity.js"

export const getUsers = async(req, res) => {
    try {
        const rows = await getUsersService()
        if (rows == null) res.sendStatus(500).json(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        if (rows.length <= 0) res.sendStatus(200).json(responseBody(3, Constants.MESSAGE_NO_RESULTS_FOUND, null))
        res.sendStatus(200).json(responseBody(1, Constants.MESSAGE_STATUS_OK, rows))
    } catch (error) {
        res.sendStatus(500).json(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
    }
}

export const getUserById = async(req, res) => {
    try {
        const userId = req.params.userId
        const rows = await getUserByIdService(userId)
        if (rows == null) res.sendStatus(500).json(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        if (rows.length <= 0) res.sendStatus(500).json(responseBody(2, Constants.MESSAGE_NO_RESULTS_FOUND, null))
        res.sendStatus(200).json(responseBody(1, Constants.MESSAGE_STATUS_OK, Constants.STRING_EMPTY, rows[0]))
    } catch (error) {
        res.sendStatus(500).json(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
    }
}

export const getUserByEmail = async(req, res) => {
    try {
        const email = req.params.userId
        const rows = await getUserByEmailService(email)
        if (rows == null) res.sendStatus(500).json(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        if (rows.length <= 0) res.sendStatus(500).json(responseBody(2, Constants.MESSAGE_NO_RESULTS_FOUND, null))
        res.sendStatus(200).json(responseBody(1, Constants.MESSAGE_STATUS_OK, rows[0]))
    } catch (error) {
        res.sendStatus(500).json(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
    }
}

export const createUser = async(req, res) => {
    try {
        const { name, lastName, email, password, age, gender } = req.body
        const rows = await getUserByEmailService(email)
        if (rows == null) res.sendStatus(500).json(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        if (rows.length <= 0) res.sendStatus(500).json(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        const hashedPassword = await bcrypt.hash(password, 10)
        const result = await createUserService(name, lastName, email, hashedPassword, gender, age)
        if (result == null) res.sendStatus(500).json(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        if (result == 2) res.sendStatus(500).json(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        res.sendStatus(200).json(responseBody(1, Constants.MESSAGE_STATUS_OK, null))
    } catch (error) {
        res.sendStatus(500).json(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
    }
}

export const login = async(req, res) => {
    try {
        const { email, password } = req.body
        const userObject = await getUserByEmail(email)
        if (userObject == 2) res.sendStatus(500).json(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        const isValid = bcrypt.compare(password, userObject.password)
        if (!isValid) res.sendStatus(500).json(responseBody(2, Constants.MESSAGE_LOGIN_INVALID_PASSWORD, null))
        const token = jwtSign(userObject)
        res.sendStatus(200).cookie(Constants.COOKIE_SECURITY_NAME, token, {
            httpOnly: true,
            secure: process.env.ENV == 'prod' ? true : false,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60
        }).json(responseBody(1, Constants.MESSAGE_STATUS_OK, userObject))
    } catch (error) {
        res.sendStatus(500).json(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
    }
}

export const logout = (req, res) => {
    res.clearCookie('acces_token').json('ok')
}

export const updateUser = async(req, res) => {
    try {
        const { name, lastName, email, gender, age, userId } = req.body
        const result = await updateUserService(name, lastName, email, gender, age, userId)
        if (result == null) res.sendStatus(500).json(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        if (result == 2) res.sendStatus(500).json(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        res.sendStatus(200).json(responseBody(1, Constants.MESSAGE_STATUS_OK, null))
    } catch (error) {
        res.sendStatus(500).json(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
    }
}

export const deleteUser = async(req, res) => {
    try {
        const { userId } = req.params
        const result = await deleteUserService(userId)
        if (result = null) res.sendStatus(500).json(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        if (result == 2) res.sendStatus(500).json(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        res.sendStatus(200).json(responseBody(1, Constants.MESSAGE_STATUS_OK, null))
    } catch (error) {
        res.sendStatus(500).json(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
    }
}