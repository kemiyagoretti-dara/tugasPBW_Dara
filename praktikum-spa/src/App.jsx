import { useEffect } from "react";
import {
  Link, NavLink, Route, Routes,
  useParams, useSearchParams
} from "react-router";
import { useFavorites } from "./hooks/useFavorites";

const PRODUCTS = [//Data produk yang digunakan dalam katalog
  //produk 1
  { 
    id : 1,
    name : "Buku React",
    price : 85000,
    category : "Buku"

  },

  //produk 2
  {
    id : 2,
    name : "Buku Web",
    price : 70000,
    category : "Buku",

  },

  //produk 3
  {
    id: 3,
    name: "Keyboard",
    price: 150000,
    category: "Elektronik"

  },
  //produk 4
  {
    id: 4,
    name : "Mouse",
    price : 90000,
    category : "Elektronik"
  },

];
const rupiah = value => new Intl.NumberFormat("id-ID", {
  style: "currency", currency: "IDR",
  maximumFractionDigits: 0
}).format(value);

export default function App() {
  const { ids, storageError } = useFavorites();
  return (
    <>
      <header>
        <h1>Katalog Praktikum</h1>
        <nav aria-label="Navigasi utama">
          <NavLink to="/" end>Beranda</NavLink>
          <NavLink to="/products">Produk</NavLink>
          <NavLink to="/favorites">
            Favorit ({ids.length})
          </NavLink>
          <NavLink to="/about">Tentang</NavLink>
        </nav>
      </header>
      <main>
        {storageError && <p role="alert">{storageError}</p>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Catalog />} />
          <Route path="/products/:id" element={<Detail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

function usePageTitle(title) {
  useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => { document.title = previous; };
  }, [title]);
}

function Home() {
  usePageTitle("Beranda Katalog");
  return (
    <section>
      <h2>Selamat datang</h2>
      <p>Pilih produk dan simpan sebagai favorit.</p>
      <Link to="/products">Buka katalog</Link>
    </section>
  );
}

function ProductCard({ product }) {
  const { ids, toggle } = useFavorites();
  const selected = ids.includes(product.id);
  return (
    <article className="card">
      <h3>
        <Link to={`/products/${product.id}`}>
          {product.name}
        </Link>
      </h3>
      <p>{rupiah(product.price)}</p>
      <button type="button" aria-pressed={selected}
        onClick={() => toggle(product.id)}>
        {selected ? "Hapus favorit" : "Tambah favorit"}
      </button>
    </article>
  );
}

function Catalog() {
  usePageTitle("Katalog Produk");//mengatur judul tab browser
  //Mengambil kata pencarian dari URL
  const [params, setParams] = useSearchParams();
  //mengambil kata pencarian dari URL
  const q = params.get("q") ?? "";
  //Mengambil kategori dari URL
  const category = params.get("category") ?? "Semua";
    // Memfilter produk berdasarkan nama dan kategori
  const filtered = PRODUCTS.filter(product => {
    // Mengecek apakah nama produk sesuai pencarian
    const cocokNama = product.name
      .toLowerCase()
      .includes(q.toLowerCase());

    // Mengecek apakah kategori sesuai pilihan
    const cocokKategori =
      category === "Semua" ||
      product.category === category;

    // Produk ditampilkan jika keduanya sesuai
    return cocokNama && cocokKategori;
  });





  //Mengubah katapencarian pada URL
  function updateQuery(value, replace = true) {
    //membuat salinan paramenter URL yang sekarang
    const next = new URLSearchParams(params);
    //Jika ada kata pencarian, simpan ke paramenter q
    if (value){
      next.set("q", value);
    } else {//jiak kososng , maka hapus parameter q
      next.delete("q");
    }
    //Mengubah URL tanpa menghapus paramenter lainnya 
    setParams(next, { replace });
  }

  //Mengubah kategori pada URL
  function updateCategory(value){
    const next = new URLSearchParams(params);
    if(value !== "Semua"){
      next.set("category", value);
    } else {
      next.delete("category");
    }
    setParams(next);
  }

  return (
    <section>
      <h2>Produk</h2>
      <label htmlFor="search">Cari produk</label>
      <input id="search" value={q}
        onChange={event => updateQuery(event.target.value)}
        placeholder="Contoh Buku" />
    
      <button type="button"
        onClick={() => updateQuery("", false)}>
        Reset pencarian
      </button>

    {/* Pilihan kategori produk */}
<div>
  <p>Kategori:</p>

  {/* Tombol untuk menampilkan semua kategori */}
  <button
    type="button"
    onClick={() => updateCategory("Semua")}
  >
    Semua
  </button>

  {/* Tombol untuk menampilkan produk kategori Buku */}
  <button
    type="button"
    onClick={() => updateCategory("Buku")}
  >
    Buku
  </button>

  {/* Tombol untuk menampilkan produk kategori Elektronik */}
  <button
    type="button"
    onClick={() => updateCategory("Elektronik")}
  >
    Elektronik
  </button>
</div>


      <p>{filtered.length} produk ditemukan</p>
      <div className="grid">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filtered.length === 0 && <p>Produk tidak ditemukan.</p>}
    </section>
  );
}

function Detail() {
  const { id } = useParams();
  const product = PRODUCTS.find(item => String(item.id) === id);
  usePageTitle(product ? product.name : "Produk tidak ditemukan");
  return (
    <section>
      <h2>Detail produk</h2>
      {product ? <ProductCard product={product} />
        : <p>ID produk tidak tersedia.</p>}
      <Link to="/products">Kembali ke katalog</Link>
    </section>
  );
}

function Favorites() {
  usePageTitle("Produk Favorit");
  //mengambil data favorit dan fungsi untuk menghapus semuanya
  const { ids , clearAll} = useFavorites();
  //mengammbil data prodk yang ada d daftar favorit
  const selected = PRODUCTS.filter(item => ids.includes(item.id));
  return (
    <section>
      <h2>Produk favorit</h2>
      {/* Tombol untuk menghapus semua favorit */}
      <button type="button" onClick={clearAll}disabled={selected.length === 0}  >
        Hapus Semua Favorit
      </button>
      <div className="grid">
        {selected.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {selected.length === 0 &&( <p>Belum ada produk favorit.</p>)}
    </section>
  );
}

function About() {
  // Mengatur judul tab browser
  usePageTitle("Tentang");

  return (
    <section>
      <h2>Tentang</h2>
      <p>
        Aplikasi ini merupakan praktikum React SPA
        yang menggunakan routing, custom hook,
        dan penyimpanan favorit.
      </p>
    </section>
  );
}
function NotFound() {
  usePageTitle("Halaman tidak ditemukan");
  return (
    <section>
      <h2>Halaman tidak ditemukan</h2>
      <Link to="/">Kembali ke beranda</Link>
    </section>
  );
}
