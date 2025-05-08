const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Add product to cart
router.post('/cart', auth, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await Cart.findOneAndUpdate(
            { user: req.user.id },
            { $push: { items: { product: productId, quantity } } },
            { new: true, upsert: true }
        );
        res.json(cart);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});