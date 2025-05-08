const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Get all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find().sort({ category: 1 });
        res.json(services);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Add new service (admin only)
router.post('/', auth, async (req, res) => {
    try {
        const newService = new Service({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            duration: req.body.duration,
            category: req.body.category,
            image: req.body.image
        });
        const service = await newService.save();
        res.json(service);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});