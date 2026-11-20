# KitaInvest

Website edukasi keuangan sederhana untuk Tugas Besar Sistem Multimedia 2026.
Kelompok 1: Sion Marcelyo Gunawan dan Yuhen Aditya Gunawan.

## Fitur

- Beranda berisi pengantar dan tiga menu utama, tanpa foto atau animasi.
- Pilihan kategori Pelajar, Pekerja, dan Pensiunan beserta formulir profil.
- Lima judul topik wajib. Hanya Pengelolaan Uang yang berisi materi, contoh, dan dua soal kuis. Empat topik lain belum berisi materi.
- Simulasi rencana dana dengan tombol hitung, hasil angka, dan tabel bulanan. Asumsi pertumbuhan dan inflasi bersifat opsional, dengan nilai awal 0%.
- Perjalanan belajar berupa jumlah topik selesai dan tabel nilai, tanpa lencana.

## Menjalankan

Gunakan Node.js yang kompatibel dengan versi Vite pada package.json.

```bash
npm install
npm run dev
```

Buka alamat lokal yang ditampilkan Vite. Untuk pengujian dan build:

```bash
npm test
npm run build
```

Hasil build statis tersedia di `dist/`. Tidak ada backend atau database server.

## Bagian kode utama

| File | Fungsi |
| --- | --- |
| `src/App.jsx` | Memilih halaman sesuai menu yang diklik. |
| `src/context/AppContext.jsx` | Menyimpan pilihan halaman, profil, input simulasi, dan progres selama aplikasi digunakan. |
| `src/data/topics/topicsData.js` | Menyimpan lima judul topik serta materi dan kuis topik pertama. |
| `src/pages/learning/LearningPage.jsx` | Menampilkan daftar topik dan isi materi yang dipilih. |
| `src/components/quiz/QuizComponent.jsx` | Memeriksa jawaban dan menghitung nilai kuis. |
| `src/pages/simulation/SimulationPage.jsx` | Membaca input dan menampilkan hasil perhitungan ketika formulir dikirim. |
| `src/engine/calculator.js` | Menghitung setoran, pertumbuhan bulanan, dan nilai setelah inflasi. |
| `src/utils/storage.js` | Menyimpan kategori dan catatan belajar di peramban. |
| `src/styles/main.css` | Mengatur warna, jarak, formulir, tabel, dan tampilan ponsel. |

Angka keuangan hanya disimpan dalam state React dan hilang saat halaman dimuat ulang. Catatan kategori dan belajar disimpan di localStorage. Catatan lama dari empat topik yang dikosongkan tidak dihitung sebagai topik selesai pada tampilan saat ini. Penyelesaian topik pertama bernilai 20% dari lima judul yang ada.

## Alur untuk penjelasan video

1. Perkenalkan tujuan website dari beranda.
2. Pilih kategori, isi profil, lalu periksa ringkasan dan dasbor.
3. Buka Belajar, jelaskan lima judul dan materi yang tersedia pada topik pertama.
4. Kerjakan kuis, lalu tunjukkan nilai dan status selesai di Perjalanan Belajar.
5. Buka Simulasi. Contoh: dana awal Rp1.000.000, setoran Rp100.000, waktu 12 bulan, pertumbuhan dan inflasi 0%. Hasilnya Rp2.200.000.
6. Jelaskan bahwa React menampilkan data, CSS mengatur tampilan, dan fungsi kalkulator mengolah angka.

KitaInvest hanya untuk belajar dan tidak melayani transaksi investasi.
