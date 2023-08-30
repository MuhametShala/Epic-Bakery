const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const { authMiddleware } = require('../middlewares/authMiddleware');
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');
const cartController = require('../controllers/cartController');

// Ottieni tutti i prodotti
router.get('/products', productController.getAllProducts);

// Ottieni un prodotto per ID
router.get('/products/:id', productController.getProductById);

// Crea un nuovo prodotto
router.post('/products', authMiddleware, productController.createProduct);

// Aggiorna un prodotto per ID
router.put('/products/:id', authMiddleware, productController.updateProduct);

// Aggiorna parzialmente un prodotto per ID utilizzando PATCH
router.patch('/products/:id', authMiddleware, productController.partialUpdateProduct);

// Elimina un prodotto per ID
router.delete('/products/:id', authMiddleware, productController.deleteProduct);

// Gestione degli ordini
router.post('/orders', authMiddleware, orderController.createOrder);
router.get('/orders', authMiddleware, orderController.getAllOrders);
router.get('/orders/:id', authMiddleware, orderController.getOrderById);
router.put('/orders/:id', authMiddleware, orderController.updateOrder);
router.delete('/orders/:id', authMiddleware, orderController.deleteOrder);

// Gestione del carrello
router.post('/carts', authMiddleware, cartController.createCart);
router.get('/carts/:id', authMiddleware, cartController.getCartById);
router.put('/carts/:id', authMiddleware, cartController.updateCart);
router.delete('/carts/:id', authMiddleware, cartController.deleteCart);

module.exports = router;
