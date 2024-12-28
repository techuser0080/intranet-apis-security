import { getUsersService, getUserByIdService, createUserService, updateUserService, deleteUserService, loginService, getUserByEmailService } from "../services/userService.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser"

export const getUsers = async(req, res) => {
    const rows = await getUsersService()
    res.send(rows)
}

export const getUserById = async(req, res) => {
    const userId = req.params.userId
    const [rows] = await getUserByIdService(userId)
    if (rows.length <=0) return res.status(404).json({
        message: 'No se encontraron registros.'
    })
    res.send(rows[0])
}

export const getUserByEmail = async(req, res) => {
    const email = req.params.userId
    const [rows] = await getUserByEmailService(email)
    if (rows.length <=0) return res.status(404).json({
        message: 'No se encontraron registros.'
    })
    res.send(rows[0])
}

export const createUser = async(req, res) => {
    const { name, lastName, email, password, age, gender } = req.body
    if ( typeof email === 'string') throw new Error('El email debe ser string.')
    if ( String(email).includes('hotmail.com') == false || String(email).includes('gmail.com') == false 
        || String(email).includes('outlook.com')) throw new Errror('Email debe tener formato correo.')
    const [rows] = await getUserByEmailService(email)
    if (rows.length > 0) res.sendStatus(500)
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await createUserService(name, lastName, email, hashedPassword, gender, age)
    if(result == 2) res.sendStatus(500)
    res.sendStatus(200)
}

export const login = async(req, res) => {
    const { email, password } = req.body
    const userObject = await getUserByEmail(email)
    if (userObject == 2) res.sendStatus(500)
    const isValid = bcrypt.compare(password, userObject.password)
    if (!isValid) res.sendStatus(500)
    const token = jwt.sign({ userName: userObject.userName, userLastName: userLastName, email: userObject.email,
                            gender: userObject.gender, age: userObject.age}, '', {
                                expiresIn: '1h'
                            })
    res.sendStatus(200).cookie('access_token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60
    })
}

export const logout = (req, res) => {
    res.clearCookie('acces_token').json('ok')
}

export const updateUser = async(req, res) => {
    const { name, lastName, email, gender, age, userId } = req.body
    const result = await updateUserService(name, lastName, email, gender, age, userId)
    if(result == 2) res.sendStatus(500)
    res.sendStatus(200)
}

export const deleteUser = async(req, res) => {
    const { userId } = req.params
    const result = await deleteUserService(userId)
    if(result == 2) res.sendStatus(500)
    res.sendStatus(200)
}