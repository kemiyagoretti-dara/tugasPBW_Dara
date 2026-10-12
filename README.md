## DESKRIPSI TUGAS PRAKTIKUM DARA

Website Mahasiswa ini merupakan aplikasi sederhana yang dibuat menggunakan React JS dan Vite. Website ini dibuat untuk memenuhi tugas praktikum Pemrograman Berbasis Web.

Website ini memiliki beberapa fitur utama, yaitu Profil Mahasiswa, daftar Mata kuliah,penghitung presensi, dan daftar tugas kuliah.

## Teknologi yang Digunakan

- React JS
- Vite
- JavaScript / JSX
- HTML
- CSS
- LocalStorage
- Visual Studio Code
- Node.js

## Fitur Website

### 1. Profil Mahasiswa

Menampilkan informasi mahasiswa berupa:

- Nama
- NIM
- Program Studi
- Foto profil

### 2. Daftar Mata Kuliah

Menampilkan daftar mata kuliah dalam bentuk card.

Fitur yang digunakan:

- React Component
- Props
- `map()`
- `key`

Mata kuliah yang ditampilkan:

- Pemrograman Web - 5 SKS
- Metode Numerik - 3 SKS
- Sistem Cerdas - 3 SKS
- Aljabar Linear - 2 SKS

### 3. Penghitung Kehadiran

Fitur ini digunakan untuk menghitung jumlah kehadiran mahasiswa.

Terdapat tiga tombol:

- Tambah
- Kurangi
- Reset

Jumlah kehadiran dibatasi dari 0 sampai 30.

### 4. Daftar Tugas Kuliah

Fitur daftar tugas digunakan untuk mengelola tugas kuliah.

Fitur yang tersedia:

- Menambahkan tugas
- Menandai tugas sebagai selesai
- Membatalkan status selesai
- Mengedit tugas
- Menghapus tugas
- Filter Semua
- Filter Aktif
- Filter Selesai
- Menghitung jumlah tugas selesai

Data tugas juga disimpan menggunakan `localStorage`, sehingga data tetap tersimpan
ketika halaman di-refresh.

## Konsep React yang Digunakan

Beberapa konsep React yang digunakan dalam project ini adalah:

- Component
- Props
- `useState`
- Event handling
- Conditional rendering
- `map()`
- `key`
- LocalStorage

## Struktur Project

```text
my-react-app/
├── public/
├── src/
│   ├── assets/
│   │   └── fotoProfil_Kemi.jpeg
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```
