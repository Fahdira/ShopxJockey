const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Load key securely from a file (can be generated once and reused)
const keyPath = path.join(__dirname, '../aes-key.txt');
let key;

if (fs.existsSync(keyPath)) {
  key = fs.readFileSync(keyPath);
} else {
  key = crypto.randomBytes(32); // AES-256 needs 32 bytes
  fs.writeFileSync(keyPath, key);
}

const ivLength = 16; // AES block size

function encrypt(text) {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

function decrypt(encryptedText) {
  const [ivHex, encrypted] = encryptedText.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
}

module.exports = { encrypt, decrypt };