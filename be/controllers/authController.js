const bcrypt = require('bcrypt');
const User = require('../models/User');

// Autenticazione dell'utente
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifica se l'utente esiste
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Confronta la password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(400).json({ error: 'Authentication failed' });
  }
};
