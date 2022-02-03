const mongoose = require('mongoose');

const parkingRecordSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    vehicleNo: { type: String, required: true },
    reserved: { type: Boolean, required: true },
    reservedComment: { type: String, required: false },
    slotNo: { type: Number, required: true },
    status: { type: Boolean, required: true },
    comment: { type: String, required: true }
}, { timestamps: true });

const ParkingRecord = mongoose.model('ParkingRecord', parkingRecordSchema);

module.exports = ParkingRecord;