const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Registrazione utente
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed' });
  }
});

// Login utente
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(400).json({ error: 'Authentication failed' });
  }
});

module.exports = router;
