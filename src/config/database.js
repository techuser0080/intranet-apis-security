import mysql from 'mysql2'
import { Constants } from './constants.js'

export const pool = mysql.createPool({
    host: Constants.SECURITY_DATABASE_HOST,
    user: Constants.SECURITY_DATABASE_USER_NAME,
    port: Constants.SECURITY_DATABASE_PORT,
    password: Constants.SECURITY_DATABASE_PASSWORD,
    database: Constants.SECURITY_DATABASE_NAME,
    multipleStatements: true
})