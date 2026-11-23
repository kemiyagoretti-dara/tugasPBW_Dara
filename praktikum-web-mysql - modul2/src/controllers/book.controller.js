// Mengimpor BookService untuk menjalankan proses database
const BookService = require('../services/book.service');

// Mengimpor AppError untuk menangani error
const AppError = require('../utils/app-error.util');

// Membuat class BookController
class BookController {

    // Fungsi untuk menampilkan semua data buku
    async getAllBooks(req, res, next) {
        try {
            // Mengambil semua data buku dari database
            const books = await BookService.getAllBooks();

            // Mengirim data buku sebagai response
            res.status(200).json({
                status: 'success',
                results: books.length,
                data: {
                    books
                }
            });

        } catch (error) {
            // Meneruskan error ke middleware
            next(error);
        }
    }

    // Fungsi untuk menambahkan buku baru
    async createBook(req, res, next) {
        try {
            // Mengambil data buku dari request body
            const { title, author_id, published_year, stock } = req.body;

            // Memanggil service untuk menyimpan buku
            const bookId = await BookService.createBook(
                title,
                author_id,
                published_year,
                stock
            );

            // Mengirim response jika buku berhasil ditambahkan
            res.status(201).json({
                status: 'success',
                data: {
                    id: bookId
                }
            });

        } catch (error) {
            // Meneruskan error ke middleware
            next(error);
        }
    }

    // Fungsi untuk memperbarui judul buku
    async updateBook(req, res, next) {
        try {
            // Mengambil ID buku dari URL
            const { id } = req.params;

            // Mengambil judul baru dari request body
            const { title } = req.body;

            // Memanggil service untuk memperbarui judul
            const updated = await BookService.updateBookTitle(id, title);

            // Jika buku tidak ditemukan
            if (!updated) {
                return next(new AppError('Buku tidak ditemukan', 404));
            }

            // Mengirim response jika berhasil diperbarui
            res.status(200).json({
                status: 'success',
                message: 'Judul buku berhasil diperbarui'
            });

        } catch (error) {
            // Meneruskan error ke middleware
            next(error);
        }
    }
}

// Mengekspor controller agar dapat digunakan oleh file lain
module.exports = new BookController();