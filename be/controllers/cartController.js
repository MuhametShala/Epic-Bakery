const Cart = require('../models/Cart');
const User = require('../models/User');

// Aggiungi un prodotto al carrello dell'utente
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Verifica se l'utente esiste
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Trova il carrello dell'utente o crea uno nuovo
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create({ user: userId, products: [] });
    }

    // Aggiungi il prodotto al carrello
    cart.products.push(productId);
    await cart.save();

    res.status(201).json({ message: 'Product added to cart', cart });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Ottieni il carrello di un utente
exports.getUserCart = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Verifica se l'utente esiste
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Trova il carrello dell'utente
    const cart = await Cart.findOne({ user: userId }).populate('products');

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
