const Order = require('../models/Order');
const User = require('../models/User');

// Crea un nuovo ordine
exports.createOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;

    // Verifica se l'utente esiste
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Calcola il totale dell'ordine in base ai prodotti
    const totalAmount = products.reduce((total, product) => total + product.price, 0);

    // Crea l'ordine
    const order = await Order.create({ user: userId, products, totalAmount });

    res.status(201).json({ message: 'Order created', order });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Ottieni gli ordini di un utente
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Verifica se l'utente esiste
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Trova gli ordini dell'utente
    const orders = await Order.find({ user: userId });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
