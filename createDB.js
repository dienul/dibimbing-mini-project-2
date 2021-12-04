const mysql = require('mysql2/promise');

const dbName = process.env.DB_SCHEMAS || "merchant";

mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "3306",
    user     : process.env.DB_USER || "root",
    password : process.env.DB_PASSWORD || "password",
}).then( connection => {
    connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`).then((res) => {
        console.info("Database create or successfully checked");
        process.exit(0);
    })
})