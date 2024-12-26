import { getUsersService, getUserByIdService, createUserService, updateUserService, deleteUserService } from "../services/userService.js"

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

export const createUser = async(req, res) => {
    const { user, name, lastName, age, gender } = req.body
    const result = await createUserService(user, name, lastName, age, gender)
    if(result == 2) res.sendStatus(500)
    res.sendStatus(200)
}

export const updateUser = async(req, res) => {
    const { user, name, lastName, age, gender, userId } = req.body
    const result = await updateUserService(user, name, lastName, age, gender, userId)
    if(result == 2) res.sendStatus(500)
    res.sendStatus(200)
}

export const deleteUser = async(req, res) => {
    const { userId } = req.params
    const result = await deleteUserService(userId)
    if(result == 2) res.sendStatus(500)
    res.sendStatus(200)
}