const express = require('express');
const path = require('path');
const users = require('./routes/users');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/register', (_, res) => res.sendFile(path.join(__dirname, 'views/register.html')));
app.get('/login', (_, res) => res.sendFile(path.join(__dirname, 'views/login.html')));
app.get('/index', (_, res) => res.sendFile(path.join(__dirname, 'views/index.html')));

app.use('/api', users);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));