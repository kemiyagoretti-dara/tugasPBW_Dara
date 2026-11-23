// Mengimpor koneksi database
const pool = require('../config/db');

// Membuat class BookService
class BookService {

    // Fungsi untuk mengambil semua data buku
    async getAllBooks() {
        // Query untuk mengambil data buku beserta nama penulisnya
        const sql = `
            SELECT books.id, books.title, books.published_year, books.stock, authors.name AS author_name
            FROM books
            JOIN authors ON books.author_id = authors.id
        `;

        // Menjalankan query dan mengambil hasilnya
        const [rows] = await pool.execute(sql);

        // Mengembalikan data buku
        return rows;
    }

    // Fungsi untuk menambahkan buku baru
    async createBook(title, author_id, published_year, stock) {
        // Query untuk memasukkan data buku
        const sql = 'INSERT INTO books (title, author_id, published_year, stock) VALUES (?, ?, ?, ?)';

        // Menjalankan query dengan parameter
        const [result] = await pool.execute(sql, [
            title,
            author_id,
            published_year,
            stock
        ]);

        // Mengembalikan ID buku yang baru dibuat
        return result.insertId;
    }

    // Fungsi untuk memperbarui judul buku
    async updateBookTitle(id, title) {
        // Query untuk mengubah judul buku berdasarkan ID
        const sql = 'UPDATE books SET title = ? WHERE id = ?';

        // Menjalankan query dengan parameter
        const [result] = await pool.execute(sql, [title, id]);

        // Mengembalikan true jika data berhasil diperbarui
        return result.affectedRows > 0;
    }
}

// Mengekspor object BookService
module.exports = new BookService();