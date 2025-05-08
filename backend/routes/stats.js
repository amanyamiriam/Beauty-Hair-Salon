const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Get dashboard statistics
router.get('/dashboard', auth, async (req, res) => {
    try {
        const stats = {
            totalClients: await User.countDocuments({ role: 'client' }),
            totalServices: await Service.countDocuments(),
            activeEmployees: await User.countDocuments({ role: 'stylist', status: 'active' }),
            totalAppointments: await Appointment.countDocuments(),
            revenueStats: await Appointment.aggregate([
                { $group: { _id: null, total: { $sum: "$price" } } }
            ])
        };
        res.json(stats);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});