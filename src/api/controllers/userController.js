import { users, getUserById, createUser, updateUser, deleteUser } from "../services/userService"

const getUsers = async(req, res) => {
    const rows = await users()
    res.send(rows)
}

const getUserById = async(req, res) => {
    const userId = req.params.userId
    const [rows] = await getUserById(userId)
    if (rows.length <=0) return res.status(404).json({
        message: 'No se encontraron registros.'
    })
    res.send(rows[0])
}

const createUser = async(req, res) => {
    const { user, name, lastName, age, gender } = req.body
    const result = await createUser(user, name, lastName, age, gender)
    if(result == 2) res.sendStatus(500)
    res.sendStatus(200)
}

const updateUser = async(req, res) => {
    const { user, name, lastName, age, gender, userId } = req.body
    const result = await updateUser(user, name, lastName, age, gender, userId)
    if(result == 2) res.sendStatus(500)
    res.sendStatus(200)
}

const deleteUser = async(req, res) => {
    const { userId } = req.params
    const result = await deleteUser(userId)
    if(result == 2) res.sendStatus(500)
    res.sendStatus(200)
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}