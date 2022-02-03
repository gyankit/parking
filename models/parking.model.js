const mongoose = require('mongoose');

const parkingSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    vehicleNo: { type: String, required: true },
    reserved: { type: Boolean, required: true },
    comment: { type: String, required: false },
    slotNo: { type: Number, required: true },
}, { timestamps: true });

const Parking = mongoose.model('Parking', parkingSchema);

module.exports = Parking;