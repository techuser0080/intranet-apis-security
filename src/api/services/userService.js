import { pool } from "../../config/database"

export const users = async(req, res) => {
    const [rows] = await pool.query('SELECT * FROM user')
    return rows
}

export const getUserById = async(req, res) => {
    const userId = req.params.userId
    const [rows] = await pool.query('SELECT * FROM user WHERE userId = ? and status = 1', [userId])
    return rows
}

export const createUser = async(user, name, lastName, age, gender) => {
    const [rows] = await pool.query('INSERT INTO usuario (user, name, lastName, age, gender, status) VALUES (?,?,?,1)', [user, name, lastName, age, gender])
    return {rows}
}

export const updateUser = async(user, name, lastName, age, gender, userId) => {
    const [rows] = await pool.query('INSERT INTO usuario (user, name, lastName, age, gender, status) VALUES (?,?,?,1)', [user, name, lastName, age, gender])
    return {rows}
}

export const deleteUser = async(userId) => {
    const [rows] = await pool.query('UPDATE user SET status = 2 WHERE userId = ?', [userId])
    return {rows}
}