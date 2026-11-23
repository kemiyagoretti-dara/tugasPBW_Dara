// Mengimpor koneksi database
const pool = require('../config/db');

// Membuat class AuthorService
class AuthorService {

    // Fungsi untuk menambahkan penulis baru
    async createAuthor(name, email) {
        // Query untuk memasukkan data penulis
        const sql = 'INSERT INTO authors (name, email) VALUES (?, ?)';

        // Menjalankan query menggunakan parameter
        const [result] = await pool.execute(sql, [name, email]);

        // Mengembalikan ID penulis yang baru dibuat
        return result.insertId;
    }

    // Fungsi untuk menghapus penulis
    async deleteAuthor(id) {
        // Query untuk menghapus penulis berdasarkan ID
        const sql = 'DELETE FROM authors WHERE id = ?';

        // Menjalankan query menggunakan parameter ID
        const [result] = await pool.execute(sql, [id]);

        // Mengembalikan true jika data berhasil dihapus
        return result.affectedRows > 0;
    }
}

// Mengekspor object AuthorService
module.exports = new AuthorService();