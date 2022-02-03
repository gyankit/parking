const express = require('express');
const parking = require('../controllers/parking.controller')

const router = express.Router();

router.post('/booking', parking.booking);
router.get('/available-slots', parking.availableSlot);
router.get('/occupied-slots', parking.availableSlot);
router.get('/registered-users', parking.registeredUsers);

module.exports = router;