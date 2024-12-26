import { pool } from "../../config/database.js"

export const getUsersService = async() => {
    const [rows] = await new Promise((resolve, reject) => {
        pool.query('CALL spGetUsers()', [], (err, results) => {
            console.log('method')
            if (err) reject(new Error(err.message))
                console.log(results)
            resolve(results)
        })
    })
    return rows
}

export const getUserByIdService = async(userId) => {
    const [rows] = await new Promise((resolve, reject) => {
        pool.query('CALL spGetUserById(?)', [userId], (err, results) => {
            if (err) reject(new Error(err.message))
            resolve(results)
        })
    })
    return rows
}

export const createUserService = async(user, name, lastName, age, gender) => {
    const result = await new Promise((resolve, reject) => {
        pool.query('CALL spCreateUser(?,?,?,?,?,@statusCode); SELECT @statusCode', [user, name, 
            lastName, gender, age], (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results)
        })
    })
    return result
}

export const updateUserService = async(user, name, lastName, age, gender, userId) => {
    const result = await new Promise((resolve, reject) => {
        pool.query('CALL spUpdateUser(?,?,?,?,?,?,@statusCode); SELECT @statusCode', [name, lastName, 
            user, gender, age, userId], (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results)
        })
    })
    return result
}

export const deleteUserService = async(userId) => {
    const result = await new Promise((resolve, reject) => {
        pool.query('CALL spDeleteUser(?,@statusCode); SELECT @statusCode', [userId], (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results)
        })
    })
    return result
}