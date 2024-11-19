import { pool } from "../../config/database"

export const users = (req, res) => {
    res.send('obteniendo usuarios')
}

export const createUser = (req, res) => {
    const { user, name, lastName, age, gender, companyId } = req.body
    const [rows] = pool.query('INSERT INTO usuario (user, name, lastName, age, gender, status) VALUES (?,?,?,1)', [user, name, lastName, age, gender])
    res.send({rows})
}

export const updateUser = (req, res) => {
    res.send('actualizando usuario')
}

export const deleteUser = (req, res) => {
    res.send('eliminando usuario')
}