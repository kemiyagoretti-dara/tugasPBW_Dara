// Mengimpor AuthorService untuk menjalankan proses database
const AuthorService = require('../services/author.service');

// Mengimpor AppError untuk menangani error
const AppError = require('../utils/app-error.util');

// Membuat class AuthorController
class AuthorController {

    // Fungsi untuk menambahkan penulis baru
    async createAuthor(req, res, next) {
        try {
            // Mengambil nama dan email dari request body
            const { name, email } = req.body;

            // Memanggil service untuk menyimpan data penulis
            const authorId = await AuthorService.createAuthor(name, email);

            // Mengirim response jika berhasil
            res.status(201).json({
                status: 'success',
                data: {
                    id: authorId
                }
            });

        } catch (error) {
            // Meneruskan error ke middleware
            next(error);
        }
    }

    // Fungsi untuk menghapus penulis
    async deleteAuthor(req, res, next) {
        try {
            // Mengambil ID penulis dari URL
            const { id } = req.params;

            // Memanggil service untuk menghapus penulis
            const deleted = await AuthorService.deleteAuthor(id);

            // Jika data penulis tidak ditemukan
            if (!deleted) {
                return next(new AppError('Data penulis tidak ditemukan', 404));
            }

            // Mengirim response jika berhasil dihapus
            res.status(200).json({
                status: 'success',
                message: 'Penulis berhasil dihapus beserta bukunya'
            });

        } catch (error) {
            // Meneruskan error ke middleware
            next(error);
        }
    }
}

// Mengekspor controller agar dapat digunakan oleh file lain
module.exports = new AuthorController();