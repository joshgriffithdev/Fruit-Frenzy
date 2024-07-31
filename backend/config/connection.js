const mysql = require("mysql2");

const dotenv = require("dotenv");

dotenv.config();

const connection = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});


function query(sqlString, values) {
    return new Promise((resolve, reject) => {
        connection.query(sqlString, values, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
}

module.exports = query;