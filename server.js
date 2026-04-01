const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json());

const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});


db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT
    )
  `);

  db.run(`
    INSERT OR IGNORE INTO users (email, password)
    VALUES ('test@mail.com', '123456')
  `);
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password || email.trim() === '' || password.trim() === '') {
    return res.status(400).json({
      status: 'error',
      message: 'Email dan password wajib diisi'
    });
  }

  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, user) => {

      if (err) {
        return res.status(500).json({
          status: 'error',
          message: 'Database error'
        });
      }

      if (!user) {
        return res.status(401).json({
          status: 'error',
          message: 'User tidak ditemukan'
        });
      }

      if (user.password !== password) {
        return res.status(401).json({
          status: 'error',
          message: 'Password salah'
        });
      }

      return res.status(200).json({
        status: 'success',
        message: 'Login berhasil',
        data: {
          email: user.email,
          token: 'fake-jwt-token'
        }
      });
    }
  );
});


app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint tidak ditemukan'
  });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});