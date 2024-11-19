import mysql from 'mysql2'

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'adminadmin123',
    database: 'intranet'
}).promise()

const result = await pool.query('SELECT * FROM user')