// Mengimpor library mysql2 untuk menghubungkan Node.js dengan MySQL
const mysql = require('mysql2/promise');

// Mengambil konfigurasi dari file .env
require('dotenv').config();

// Membuat koneksi pool ke database MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,

    // Mengatur jumlah koneksi yang dapat digunakan
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Mengekspor pool agar bisa digunakan oleh file lain
module.exports = pool;