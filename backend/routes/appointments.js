const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Appointment = require('../models/Appointment');

// Get all appointments
router.get('/', auth, async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('client', 'name email')
            .populate('service', 'name price')
            .populate('stylist', 'name');
        res.json(appointments);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Create new appointment
router.post('/', auth, async (req, res) => {
    try {
        const newAppointment = new Appointment({
            client: req.user.id,
            service: req.body.serviceId,
            stylist: req.body.stylistId,
            date: req.body.date,
            notes: req.body.notes
        });

        const appointment = await newAppointment.save();
        res.json(appointment);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;