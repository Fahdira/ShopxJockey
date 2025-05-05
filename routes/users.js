const express = require('express');
const router = express.Router();
const db = require('../db');
const { encrypt, decrypt } = require('../utils/crypto');

// Register
router.post('/register', async (req, res) => {
  const { username, password, creditCard, cvv } = req.body;
  try {
    await db.execute(
      'INSERT INTO users (username, password, credit_card, cvv) VALUES (?, ?, ?, ?)',
      [encrypt(username), encrypt(password), encrypt(creditCard), encrypt(cvv)]
    );
    res.status(200).json({ message: 'Registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM users');
    const match = rows.find(user =>
      decrypt(user.username) === username && decrypt(user.password) === password
    );

    if (match) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

module.exports = router;