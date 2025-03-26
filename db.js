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
// Create part table
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
        
        connection.query(`
            ALTER TABLE parts
            ADD COLUMN IF NOT EXISTS model VARCHAR(255)
            `, (err) => {
                if (err) throw new Error(err);
                console.log("Model column added");
            });
        connection.query(`
            ALTER TABLE parts
            ADD COLUMN IF NOT EXISTS quantity INT
            `, (err) => {
                if (err) throw new Error(err);
                console.log("Quantity column added");
            });
    });

// Create orders table
connection.query(`CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL, 
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NULL,
    address TEXT NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`, (err) => {  // <-- Corrected callback syntax
    if (err) throw new Error(err);
    console.log("Table 'orders' created/exists");

    connection.query(`
        ALTER TABLE orders
        ADD COLUMN IF NOT EXISTS klarna_order_id VARCHAR(255) NOT NULL
        `, (err) => {
            if (err) throw new Error(err);
            console.log("Klarna order id column added");
        });
    connection.query(`
        ALTER TABLE orders
        ADD COLUMN IF NOT EXISTS payment_status ENUM('pending', 'approved', 'failed', 'cancelled') DEFAULT 'pending' 
        `, (err) => {
            if (err) throw new Error(err);
            console.log("Payment status column added");
        });
});

connection.query(`CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    part_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (part_id) REFERENCES parts(id)
    )`, (err) => {
        if (err) throw new Error(err);
        console.log("Table 'order_items' create/exists");
    });

}


module.exports = connection;