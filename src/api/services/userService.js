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

export const getRolesByUserIdService = async(userId) => {
    const [rows] = await new Promise((resolve, reject) => {
        pool.query('CALL spGetRolesByUserId(?);', [userId], (err, results) => {
            if (err) reject(new Error(err.message))
            resolve(results)
        })
    })
    return rows
}

export const getUserByEmailService = async(email) => {
    const [rows] = await new Promise((resolve, reject) => {
        pool.query('CALL spGetUserByEmail(?);', [email], (err, results) => {
            if (err) {
                console.log(err)
                reject(new Error(err.message))
            }
            resolve(results[0])
        })
    })
    return rows
}

export const getRolesByCompanyIdService = async(companyId) => {
    const [rows] = await new Promise((resolve, reject) => {
        pool.query('CALL spGetRolesByCompanyId(?);', [companyId], (err, results) => {
            if (err) reject(new Error(err.message))
            resolve(results)
        })
    })
    return rows
}

export const getCompaniesByUserIdService = async(userId) => {
    const [rows] = await new Promise((resolve, reject) => {
        pool.query('CALL spGetCompaniesByUserId(?);', [userId], (err, results) => {
            if (err) reject(new Error(err.message))
            resolve(results)
        })
    })
    return rows
}

export const getCompaniesService = async(userId) => {
    const [rows] = await new Promise((resolve, reject) => {
        pool.query('CALL spGetCompanies();', [userId], (err, results) => {
            if (err) reject(new Error(err.message))
            resolve(results)
        })
    })
    return rows
}

export const createUserService = async(name, lastName, email, password, gender, age) => {
    const result = await new Promise((resolve, reject) => {
        pool.query('CALL spCreateUser(?,?,?,?,?,?,@statusCode); SELECT @statusCode AS result;', [name, lastName, 
            email, password, gender, age], (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results[1][0])
        })
    })
    return result
}

export const loginService = async(user, password) => {
    const result = await new Promise((resolve, reject) => {
        pool.query('CALL spLogin(?,?,@statusCode); SELECT @statusCode AS result;', [user, password], (err, results) => {
            if (err) reject(new Error(err.message))
            resolve(results[1][0])
        })
    })
}

export const updateUserService = async(name, lastName, email, gender, age, userId) => {
    const result = await new Promise((resolve, reject) => {
        pool.query('CALL spUpdateUser(?,?,?,?,?,?,@statusCode); SELECT @statusCode AS result;', [name, lastName, 
            email, gender, age, userId], (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results[1][0])
        })
    })
    return result
}

export const assignRoleToUserService = async(userId, roleId) => {
    const result = await new Promise((resolve, reject) => {
        pool.query('CALL spAssignRoleToUser(?,?,@statusCode); SELECT @statusCode AS resultAssign;', [userId, roleId], (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results[1][0])
        })
    })
    return result
}

export const deleteUserService = async(userId) => {
    const result = await new Promise((resolve, reject) => {
        pool.query('CALL spDeleteUser(?,@statusCode); SELECT @statusCode AS result;', [userId], (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results[1][0])
        })
    })
    return result
}