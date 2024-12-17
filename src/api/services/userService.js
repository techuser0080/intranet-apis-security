import { pool } from "../../config/database"

const users = async() => {
    const [rows] = await new Promise((resolve, reject) => {
        pool.query('CALL spGetUsers()', [], (err, results) => {
            if (err) reject(new Error(err.message))
            resolve(results)
        })
    })
    return rows
}

const getUserById = async(userId) => {
    const [rows] = await new Promise((resolve, reject) => {
        pool.query('CALL spGetUserById(?)', [userId], (err, results) => {
            if (err) reject(new Error(err.message))
            resolve(results)
        })
    })
    return rows
}

const createUser = async(user, name, lastName, age, gender) => {
    const result = await new Promise((resolve, reject) => {
        pool.query('CALL spCreateUser(?,?,?,?,?,@statusCode); SELECT @statusCode', [user, name, 
            lastName, age, gender], (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results)
        })
    })
    return result
}

const updateUser = async(user, name, lastName, age, gender, userId) => {
    const result = await new Promise((resolve, reject) => {
        pool.query('CALL spCreateFolder(?,?,?,?,?,?,@statusCode); SELECT @statusCode', [user, name, 
            lastName, age, gender, userId], (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results)
        })
    })
    return result
}

const deleteUser = async(userId) => {
    const result = await new Promise((resolve, reject) => {
        pool.query('CALL spDeleteUser(?,@statusCode); SELECT @statusCode', [userId], (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results)
        })
    })
    return result
}

module.exports = {
    users,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}