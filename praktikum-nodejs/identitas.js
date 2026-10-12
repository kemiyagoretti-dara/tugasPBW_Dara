import {createRoot} from 'react-dom/client';
const myElement = <h1>React is {5 + 5} times better with JSX</h1>;
const nama = "Goretti Dara Kemiya";
const nim = "255314075";
const mataKuliah = 'Pemrograman Web C';

console.log('Node.js berhasil dijalankan!');
console.log(`Nama: ${nama}`);
console.log(`NIM: ${nim}`);
console.log(`Mata kuliah: ${mataKuliah}`);
createRoot(document.getElementById('root')).render(
myElement
);