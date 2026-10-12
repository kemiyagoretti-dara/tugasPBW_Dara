import { useState } from 'react'
import './App.css'

//mengambil doto profil dari folder assets
import fotoprofil from './assets/fotoProfil_Kemi.jpeg'

// Komponen untuk menampilkan profil mahasiswa
function ProfilMahasiswa() {
  return (
    <div className="profil">

      {/* Menampilkan foto profil mahasiswa */}
      <img
        src={fotoprofil}
        alt="Foto profil mahasiswa"
        className="foto-profil"
      />
      <h2>Profil Mahasiswa</h2>
      <p>Nama: Goretti Dara Kemiya</p>
      <p>NIM: 255314075</p>
      <p>Program Studi: Informatika</p>
    </div>
  )
}

// Komponen untuk menampilkan satu mata kuliah
function MataKuliah({ nama, sks }) {
  return (
    <div className="card">
      <h3>{nama}</h3>
      <p>SKS: {sks}</p>
    </div>
  )
}

// Komponen untuk penghitung kehadiran
function Kehadiran() {
  // Menyimpan jumlah kehadiran, nilai awalnya 0
  const [kehadiran, setKehadiran] = useState(0)

  // Menambah jumlah kehadiran maksimal sampai 30
  function tambah() {
    if (kehadiran < 30) {
      setKehadiran(kehadiran + 1)
    }
  }

  // Mengurangi jumlah kehadiran minimal sampai 0
  function kurangi() {
    if (kehadiran > 0) {
      setKehadiran(kehadiran - 1)
    }
  }

  // Mengembalikan jumlah kehadiran menjadi 0
  function reset() {
    setKehadiran(0)
  }

  return (
    <div className="kehadiran">
      <h2>Penghitung Kehadiran</h2>

      {/* Menampilkan jumlah kehadiran */}
      <p>Kehadiran: {kehadiran}</p>

      {/* Tombol untuk mengubah jumlah kehadiran */}
      <button onClick={tambah}>Tambah</button>
      <button onClick={kurangi}>Kurangi</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

// Komponen untuk daftar tugas kuliah
function DaftarTugas() {

  // Mengambil tugas yang tersimpan di localStorage
  const [daftarTugas, setDaftarTugas] = useState(() => {
    const dataTersimpan = localStorage.getItem('daftarTugas')

    // Jika ada data, ubah kembali dari JSON menjadi array
    return dataTersimpan ? JSON.parse(dataTersimpan) : []
  })

  // Menyimpan isi input tugas
  const [inputTugas, setInputTugas] = useState('')

  // Menyimpan filter yang sedang dipilih
  const [filter, setFilter] = useState('semua')

  // Menyimpan data tugas yang sedang diedit
  const [tugasEdit, setTugasEdit] = useState(null)

  // Menyimpan perubahan daftar tugas ke localStorage
  function simpanTugas(data) {
    setDaftarTugas(data)
    localStorage.setItem('daftarTugas', JSON.stringify(data))
  }

  // Menambahkan tugas baru
  function tambahTugas() {

    // Mengecek apakah input kosong
    if (inputTugas.trim() === '') {
      return
    }

    // Membuat objek tugas baru
    const tugasBaru = {
      id: Date.now(),
      nama: inputTugas.trim(),
      selesai: false
    }

    // Menambahkan tugas dan menyimpannya
    simpanTugas([...daftarTugas, tugasBaru])

    // Mengosongkan input
    setInputTugas('')
  }

  // Mengubah status tugas
  function ubahStatus(id) {
    const dataBaru = daftarTugas.map((tugas) =>
      tugas.id === id
        ? { ...tugas, selesai: !tugas.selesai }
        : tugas
    )

    // Menyimpan perubahan
    simpanTugas(dataBaru)
  }

  // Menghapus tugas
  function hapusTugas(id) {
    const dataBaru = daftarTugas.filter(
      (tugas) => tugas.id !== id
    )

    // Menyimpan perubahan
    simpanTugas(dataBaru)
  }

  // Mengedit nama tugas
  function editTugas(tugas) {
    const namaBaru = prompt(
      'Masukkan nama tugas baru:',
      tugas.nama
    )

    // Mengecek apakah nama baru kosong
    if (namaBaru === null || namaBaru.trim() === '') {
      return
    }

    // Mengubah nama tugas
    const dataBaru = daftarTugas.map((item) =>
      item.id === tugas.id
        ? { ...item, nama: namaBaru.trim() }
        : item
    )

    // Menyimpan perubahan
    simpanTugas(dataBaru)

    // Mengosongkan data edit
    setTugasEdit(null)
  }

  // Menampilkan tugas berdasarkan filter
  const tugasDitampilkan = daftarTugas.filter((tugas) => {

    if (filter === 'aktif') {
      return !tugas.selesai
    }

    if (filter === 'selesai') {
      return tugas.selesai
    }

    return true
  })

  // Menghitung jumlah tugas yang selesai
  const jumlahSelesai = daftarTugas.filter(
    (tugas) => tugas.selesai
  ).length

  return (
    <div className="daftar-tugas">
      <h2>Daftar Tugas Kuliah</h2>

      {/* Input untuk menambahkan tugas */}
      <input
        type="text"
        value={inputTugas}
        onChange={(e) => setInputTugas(e.target.value)}
        placeholder="Masukkan tugas"
      />

      <button onClick={tambahTugas}>Tambah</button>

      {/* Tombol filter tugas */}
      <div className="filter">
        <button onClick={() => setFilter('semua')}>
          Semua
        </button>

        <button onClick={() => setFilter('aktif')}>
          Aktif
        </button>

        <button onClick={() => setFilter('selesai')}>
          Selesai
        </button>
      </div>

      {/* Menampilkan jumlah tugas selesai */}
      <p>Jumlah tugas selesai: {jumlahSelesai}</p>

      {/* Menampilkan daftar tugas */}
      <ul>
        {tugasDitampilkan.map((tugas) => (
          <li key={tugas.id}>

            {/* Menampilkan nama tugas */}
            <span
              style={{
                textDecoration: tugas.selesai
                  ? 'line-through'
                  : 'none'
              }}
            >
              {tugas.nama}
            </span>

            {/* Tombol selesai atau batal */}
            <button onClick={() => ubahStatus(tugas.id)}>
              {tugas.selesai ? 'Batal' : 'Selesai'}
            </button>

            {/* Tombol edit tugas */}
            <button onClick={() => editTugas(tugas)}>
              Edit
            </button>

            {/* Tombol hapus tugas */}
            <button onClick={() => hapusTugas(tugas.id)}>
              Hapus
            </button>

          </li>
        ))}
      </ul>
    </div>
  )
}
// Komponen utama aplikasi
function App() {
  // Menyimpan menu yang sedang dipilih
  const [menuAktif, setMenuAktif] = useState('profil')

  // Data mata kuliah
  const daftarMataKuliah = [
    { id: 1, nama: 'Pemrograman Web', sks: 5 },
    { id: 2, nama: 'Metode Numerik', sks: 3 },
    { id: 3, nama: 'Sistem Cerdas', sks: 3 },
    { id: 4, nama: 'Aljabar Linear', sks: 2 }
  ]

  return (
    <div className="website">

      {/* Judul utama website */}
      <header>
        <h1>Website Mahasiswa</h1>
        <p>Goretti Dara Kemiya</p>
      </header>

      {/* Menu navigasi */}
      <nav>
        <button onClick={() => setMenuAktif('profil')}>
          Profil Mahasiswa
        </button>

        <button onClick={() => setMenuAktif('matakuliah')}>
          Daftar Mata Kuliah
        </button>

        <button onClick={() => setMenuAktif('kehadiran')}>
          Kehadiran Mahasiswa
        </button>

        <button onClick={() => setMenuAktif('tugas')}>
          Tugas Mahasiswa
        </button>
      </nav>

      {/* Menampilkan isi sesuai menu yang dipilih */}
      <main>

        {/* Menu Profil */}
        {menuAktif === 'profil' && (
          <ProfilMahasiswa />
        )}

        {/* Menu Mata Kuliah */}
        {menuAktif === 'matakuliah' && (
          <div>
            <h2>Daftar Mata Kuliah</h2>

            <div className="card-container">
              {daftarMataKuliah.map((mataKuliah) => (
                <MataKuliah
                  key={mataKuliah.id}
                  nama={mataKuliah.nama}
                  sks={mataKuliah.sks}
                />
              ))}
            </div>
          </div>
        )}

        {/* Menu Kehadiran */}
        {menuAktif === 'kehadiran' && (
          <Kehadiran />
        )}

        {/* Menu Tugas */}
        {menuAktif === 'tugas' && (
          <DaftarTugas />
        )}

      </main>





      {/* Catatan kaki website */}
      <footer>
        <p>Website Mahasiswa - Goretti Dara Kemiya</p>
      </footer>

    </div>
  )
}

// Menjadikan App sebagai komponen utama
export default App