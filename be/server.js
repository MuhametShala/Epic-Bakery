require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5050;

// Middlewares
app.use(cors());
app.use(express.json());

// Connessione al database
mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});

// Routes
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/authRoutes'); // Aggiunto il percorso delle authRoutes
app.use('/api', apiRoutes);
app.use('/auth', authRoutes); // Usando '/auth' per le authRoutes

// Server avviato
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
