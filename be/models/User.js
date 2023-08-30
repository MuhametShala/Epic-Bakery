const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

// Eseguo l'hashing della password prima di salvarla nel database
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
