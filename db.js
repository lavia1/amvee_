const mysql = require('mysql');
const config = require('./config/config.js');

const connection = mysql.createConnection(config.db);

connection.connect((err) => {
    if (err) throw new Error(err);
    console.log("Connected");

    // Create the database if it doesn't exist
    connection.query('CREATE DATABASE IF NOT EXISTS car_parts', (err) => {
        if (err) throw new Error(err);  // Correctly handle errors inside the query callback
        console.log("Database created/exists");

        // Change to the 'car_parts' database
        connection.changeUser({ database: 'car_parts' }, (err) => {
            if (err) throw new Error(err);
            console.log("Using car_parts database");

            // Now create the necessary tables
            createTable();
        });
    });
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
        part_number INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        model VARCHAR(255),
        quantity INT
    )`, (err) => {
        if (err) throw new Error(err);
        console.log("Table created/exists");
    });

// Create part images table
connection.query(`CREATE TABLE IF NOT EXISTS part_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    part_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (part_id) REFERENCES parts(id) ON DELETE CASCADE
)`, (err) => {
    if (err) throw new Error(err);
    console.log("Table part_images created/exists");
});

// Create orders table
connection.query(`CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL, 
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    klarna_order_id VARCHAR(255) NULL,
    payment_status ENUM('pending', 'approved', 'failed', 'cancelled') DEFAULT 'pending',
    country VARCHAR(50) NOT NULL,
    street_address VARCHAR(255) NOT NULL,
    street_address2 VARCHAR(255) NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    region VARCHAR(50) NULL,
    authorization_token VARCHAR(255),
    client_token VARCHAR(255),
    captured_at TIMESTAMP NULL,
    grand_total DECIMAL (10,2) DEFAULT 0.00,
    shipping_cost DECIMAL (10,2) DEFAULT 10.00,
    shipping_method ENUM('pickup', 'delivery') DEFAULT 'delivery'
    )`, (err) => {  
    if (err) throw new Error(err);
    console.log("Table 'orders' created/exists");
    });

// Create order items table
connection.query(`CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    part_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (part_id) REFERENCES parts(id)
    )`
    , (err) => {
        if (err) throw new Error(err);
        console.log("Table 'order_items' create/exists");
        
    });
}
module.exports = connection;