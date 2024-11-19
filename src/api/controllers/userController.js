import { pool } from "../../config/database"
import { users, getUserById, createUser, updateUser, deleteUser } from "../services/userService"

export const getUsers = async(req, res) => {
    const rows = await users()
    res.send(rows)
}

export const getUserById = async(req, res) => {
    const userId = req.params.userId
    const [rows] = await getUserById(userId)
    if (rows.length <=0) return res.status(404).json({
        message: 'No se encontraron registros.'
    })
    res.send(rows[0])
}

export const createUser = async(req, res) => {
    const { user, name, lastName, age, gender } = req.body
    const rows = await createUser(user, name, lastName, age, gender)
    res.send({rows})
}

export const updateUser = async(req, res) => {
    const { user, name, lastName, age, gender, userId } = req.body
    const rows = await updateUser(user, name, lastName, age, gender, userId)
    res.send(rows)
}

export const deleteUser = async(req, res) => {
    const { userId } = req.params
    const [rows] = await deleteUser(userId)
    res.send(rows)
}