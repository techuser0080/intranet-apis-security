import mysql from 'mysql2'

export const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    port: 3306,
    password: 'adminadmin123',
    database: 'intranet'
}).promise()