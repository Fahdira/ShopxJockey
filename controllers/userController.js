// controllers/userController.js
const mysql = require('mysql');
const { encrypt, decrypt } = require('../utils/crypto');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) console.error('DB connection error:', err);
  else console.log('Connected to MySQL');
});

exports.registerUser = (req, res) => {
  const { username, password, credit_card, cvv } = req.body;

  const encryptedPassword = encrypt(password);
  const encryptedCard = encrypt(credit_card);
  const encryptedCVV = encrypt(cvv);

  const sql = 'INSERT INTO users (username, password, credit_card, cvv) VALUES (?, ?, ?, ?)';
  db.query(sql, [username, encryptedPassword, encryptedCard, encryptedCVV], (err, result) => {
    if (err) {
      console.error('Register error:', err);
      return res.status(500).json({ message: 'Register failed' });
    }
    res.json({ message: 'User registered successfully' });
  });
};

exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], (err, results) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).json({ message: 'Login failed' });
    }
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = results[0];
    const decryptedPassword = decrypt(user.password);

    if (decryptedPassword === password) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
};