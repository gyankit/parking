const mongoose = require('mongoose');

const parkingSchema = new mongoose.Schema({
    user_name: { type: String, required: true },
    vehicle_number: { type: String, required: true },
    parking_number: { type: Number, required: true },
    special_booking: { type: Boolean, required: true },
    parking_confirmation: { type: Boolean, required: true },
    comment_if_special_booking: { type: String, required: false },
}, {
    timestamps: {
        createdAt: 'booking_time',
        updatedAt: 'booking_confirm_time'
    }
});

const Parking = mongoose.model('Parking', parkingSchema);

module.exports = Parking;