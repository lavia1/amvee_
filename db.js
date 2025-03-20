const mysql = require('mysql');
const config = require('./config/config.js');

const connection = mysql.createConnection(config.db);

connection.connect((err) => {
    if (err) throw new Error(err);
    console.log("Connected");
    connection.query('CREATE DATABASE  IF NOT EXISTS car_parts', () => {
        if (err) throw new Error(err);
        console.log("Database created/exists");
        connection.changeUser({ database: 'car_parts' }, (err) => {
            if (err) throw new Error(err);
            createTable();
        });
    })
});

function createTable() {
    connection.query(`CREATE TABLE IF NOT EXISTS parts (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        name VARCHAR(255) NOT NULL, 
        description TEXT,
        price DECIMAL (10,2) NOT NULL,
        stock INT NOT NULL DEFAULT 0,
        category VARCHAR(100),
        image_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) throw new Error(err);
        console.log("Table created/exists");

        connection.query(`
            ALTER TABLE parts
            ADD COLUMN IF NOT EXISTS part_number INT
            `, (err) => {
                if (err) throw new Error(err);
                console.log("Part number column added");
            });
    });
}

module.exports = connection;