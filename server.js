const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

// Menyajikan file statis (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Inisialisasi aplikasi Express
const app = express();
const port = 3000;  // Anda bisa memilih port sesuai kebutuhan

// Gunakan body-parser untuk mem-parsing request body
app.use(bodyParser.json());

// Koneksi ke MySQL
const db = mysql.createConnection({
  host: 'localhost',   // Ganti dengan host MySQL Anda
  user: 'root',        // Ganti dengan username MySQL Anda
  password: 'password', // Ganti dengan password MySQL Anda
  database: 'tr_db' // Nama database Anda
});

// Cek koneksi MySQL
db.connect((err) => {
  if (err) {
    console.error('Gagal terhubung ke database MySQL:', err);
    return;
  }
  console.log('Berhasil terhubung ke database MySQL');
});

// Endpoint untuk menambahkan torrent baru
app.post('/tr', (req, res) => {
  const { name, magnet_link, size, category } = req.body;

  if (!name || !magnet_link || !size || !category) {
    return res.status(400).json({ message: 'Semua data wajib diisi' });
  }

  const query = 'INSERT INTO torrents (name, magnet_link, size, category) VALUES (?, ?, ?, ?)';

  db.query(query, [name, magnet_link, size, category], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan torrent', error: err });
    }
    res.status(201).json({ message: 'Torrent berhasil ditambahkan', id: result.insertId });
  });
});

// Endpoint untuk mendapatkan semua torrent
app.get('/torrents', (req, res) => {
  const query = 'SELECT * FROM torrents ORDER BY upload_date DESC';

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data torrent', error: err });
    }
    res.status(200).json(results);
  });
});

// Jalankan server pada port yang telah ditentukan
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
