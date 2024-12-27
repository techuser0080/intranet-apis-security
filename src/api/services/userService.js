import { pool } from "../../config/database.js"

export const getUsersService = async() => {
    const [rows] = await new Promise((resolve, reject) => {
        pool.query('CALL spGetUsers();', [], (err, results) => {
            if (err) reject(new Error(err.message))
            resolve(results)
        })
    })
    return rows
}

export const getUserByIdService = async(userId) => {
    const [rows] = await new Promise((resolve, reject) => {
        pool.query('CALL spGetUserById(?);', [userId], (err, results) => {
            if (err) reject(new Error(err.message))
            resolve(results)
        })
    })
    return rows
}

export const getUserByEmailService = async(email) => {
    const [rows] = await new Promise((resolve, reject) => {
        pool.query('CALL spGetUserByEmail(?);', [email], (err, results) => {
            if (err) reject(new Error(err.message))
            resolve(results)
        })
    })
    return rows
}

export const createUserService = async(name, lastName, email, password, gender, age) => {
    const result = await new Promise((resolve, reject) => {
        pool.query('CALL spCreateUser(?,?,?,?,?,@statusCode); SELECT @statusCode;', [name, lastName, 
            email, password, gender, age], (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results)
        })
    })
    return result
}

export const loginService = async(user, password) => {
    const result = await new Promise((resolve, reject) => {
        pool.query('CALL spLogin(?,?,@statusCode); SELECT @statusCode;', [user, password], (err, results) => {
            if (err) reject(new Error(err.message))
            resolve(results)
        })
    })
}

export const updateUserService = async(name, lastName, email, gender, age, userId) => {
    const result = await new Promise((resolve, reject) => {
        pool.query('CALL spUpdateUser(?,?,?,?,?,?,@statusCode); SELECT @statusCode;', [name, lastName, 
            email, gender, age, userId], (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results)
        })
    })
    return result
}

export const deleteUserService = async(userId) => {
    const result = await new Promise((resolve, reject) => {
        pool.query('CALL spDeleteUser(?,@statusCode); SELECT @statusCode;', [userId], (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results)
        })
    })
    return result
}