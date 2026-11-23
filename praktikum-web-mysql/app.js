const pool = require('./db');

// Menambah Penulis
async function addAuthor(name, email) {
    const sql = 'INSERT INTO authors (name, email) VALUES (?, ?)';
    const [result] = await pool.execute(sql, [name, email]);
    return result.insertId;
}

//  Menambah Buku (termasuk kolom stock)
async function addBook(title, authorId, publishedYear, stock) {
    const sql = 'INSERT INTO books (title, author_id, published_year, stock) VALUES (?, ?, ?, ?)';
    await pool.execute(sql, [title, authorId, publishedYear, stock]);
}

//  Menampilkan Semua Buku dengan JOIN
async function showAllBooks() {
    const sql = `
        SELECT books.id, books.title, books.published_year, books.stock, authors.name AS author_name 
        FROM books 
        JOIN authors ON books.author_id = authors.id
    `;
    const [books] = await pool.execute(sql);
    console.table(books);
}

//  Fungsi Update Judul Buku berdasarkan ID
async function updateBookTitle(bookId, newTitle) {
    const sql = 'UPDATE books SET title = ? WHERE id = ?';
    const [result] = await pool.execute(sql, [newTitle, bookId]);
    console.log(`✅ Judul buku ID ${bookId} diperbarui (${result.affectedRows} baris berubah).`);
}

//  Fungsi Delete Penulis berdasarkan ID
async function deleteAuthor(authorId) {
    const sql = 'DELETE FROM authors WHERE id = ?';
    const [result] = await pool.execute(sql, [authorId]);
    console.log(`✅ Penulis ID ${authorId} dihapus (${result.affectedRows} baris berubah).`);
}

async function main() {
    try {
        console.log('\n--- 1. Menambahkan Data Awal ---');
        const idTere = await addAuthor('Tere Liye', 'tereliye@example.com');
        const idAndrea = await addAuthor('Andrea Hirata', 'andrea@example.com');

        await addBook('Bumi', idTere, 2014, 15);
        await addBook('Bulan', idTere, 2015, 10);
        await addBook('Laskar Pelangi', idAndrea, 2005, 20);

        console.log('\n--- 2. Data Buku Sebelum Update & Delete ---');
        await showAllBooks();

        console.log('\n--- 3. Menjalankan Fungsi Update Judul Buku ---');
        await updateBookTitle(1, 'Bumi (Edisi Revisi)');

        console.log('\n--- 4. Menjalankan Fungsi Delete Penulis (ID 2) ---');
        await deleteAuthor(idAndrea);

        console.log('\n--- 5. Data Buku Akhir (Efek ON DELETE CASCADE) ---');
        await showAllBooks();

    } catch (error) {
        console.error('❌ Terjadi kesalahan:', error);
    } finally {
        await pool.end();
        console.log('\n🔒 Koneksi database ditutup.');
    }
}

main();



