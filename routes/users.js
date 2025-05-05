const express = require('express');
const router = express.Router();
const db = require('../db'); // Your MySQL connection
const { encrypt } = require('../utils/encryption');
const { decrypt } = require('../utils/encryption');

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, creditCard, cvv } = req.body;

    const encryptedName = encrypt(name);
    const encryptedEmail = encrypt(email);
    const encryptedPassword = encrypt(password);
    const encryptedCard = encrypt(creditCard);
    const encryptedCvv = encrypt(cvv);

    const sql = 'INSERT INTO users (name, email, password, credit_card, cvv) VALUES (?, ?, ?, ?, ?)';
    await db.execute(sql, [encryptedName, encryptedEmail, encryptedPassword, encryptedCard, encryptedCvv]);

    res.json({ message: 'User registered securely.' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fetch all users and compare decrypted email and password
    const [rows] = await db.execute('SELECT * FROM users');
    for (let user of rows) {
      const dbEmail = decrypt(user.email);
      const dbPassword = decrypt(user.password);

      if (email === dbEmail && password === dbPassword) {
        const decryptedName = decrypt(user.name);
        res.json({
          message: 'Login successful',
          user: {
            id: user.id,
            name: decryptedName,
            email: dbEmail
          }
        });
        return;
      }
    }

    res.status(401).json({ error: 'Invalid credentials' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
