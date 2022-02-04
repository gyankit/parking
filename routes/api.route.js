const express = require('express');
const parking = require('../controllers/parking.controller')

const router = express.Router();

router.get('/available-slots', parking.availableSlot);
router.get('/occupied-slots', parking.occupiedSlot);
router.get('/registered-users', parking.registeredUsers);
router.delete('/booking-over', parking.bookingDelete);
router.put('/booking-update', parking.bookingUpdate);
router.post('/booking', parking.booking);

module.exports = router;