const schedule = require('node-schedule');
const Parking = require('../models/parking.model');

const totalParkingNumbers = 120;

const bookedParkingNumber = async () => {
    const parking = await Parking.find({});
    const parkingNumbers = parking.map(elm => {
        return elm.parking_number;
    });
    return parkingNumbers;
}

const bookingCancel = async (bookingId, bookingTime) => {
    let remaininMinutes = 30;
    const currentParkingCount = await Parking.countDocuments();
    if (currentParkingCount > totalParkingNumbers / 2) {
        remaininMinutes = 15;
    }
    const timeToDelete = new Date(+new Date(bookingTime) + 60000 * remaininMinutes);
    const job = schedule.scheduleJob('Booking Cancel', timeToDelete, async () => {
        try {
            const booking = await Parking.findByIdAndDelete(bookingId);
            console.log('Booking Canceled \n Booking ID : ' + booking._id + '\nParking Number : ' + booking.parking_number);
        } catch (error) {
            conole.error('Error Occur');
        }
    });
}

const responseObject = (parking) => {
    return {
        "Booking_Id": parking._id,
        "Parking_Numner": parking.parking_number,
        "User_Name": parking.user_name,
        "Vehicle_Number": parking.vehicle_number,
        "Booking_Time": parking.booking_time,
        "Booking_Confirm_Time": parking.parking_confirmation ? parking.booking_confirm_time : 'Not Confirmed'
    }
}

const parkingModel = (a, b, c) => {
    return {
        user_name: a.user_name,
        vehicle_number: a.vehicle_number,
        parking_number: b,
        special_booking: c ? true : false,
        parking_confirmation: false,
        comment_if_special_booking: c ? 'Pragenent Women or Differently abled Person' : '',
    }
}

const bookingSlot = (bookedParking, reserved, newParking) => {
    const reservedSlots = 0.2 * totalParkingNumbers;
    const start = reserved ? 1 : reservedSlots + 1;
    const end = reserved ? reservedSlots : totalParkingNumbers;
    for (let i = start; i <= end; i++) {
        if (bookedParking.find((x) => { return i === x })) {
            continue;
        } else {
            return parkingModel(newParking, i, reserved);
        }
    }
}

module.exports = {
    availableSlot: async (req, res) => {
        try {
            const bookedParking = await bookedParkingNumber();
            let availableParking = []
            for (let i = 1; i <= totalParkingNumbers; i++) {
                if (bookedParking.find((x) => { return i === x })) { continue; }
                else { availableParking.push(i); }
            }
            res.status(200).send(availableParking);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    occupiedSlot: async (req, res) => {
        try {
            const bookedParking = await bookedParkingNumber();
            bookedParking.sort((a, b) => a - b);
            res.status(200).send(bookedParking);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    registeredUsers: async (req, res) => {
        try {
            const bookedParking = await Parking.find({});
            const totalRegistedUSers = bookedParking.map(elm => {
                return responseObject(elm);
            });
            totalRegistedUSers.sort((a, b) => a.parking_number - b.parking_number);
            res.status(200).json(totalRegistedUSers);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    bookingDelete: async (req, res) => {
        const parking = await Parking.findOneAndDelete({ "_id": req.body.booking_id, "parking_number": req.body.parking_number });
        res.status(200).json(responseObject(parking));
    },

    bookingUpdate: async (req, res) => {
        try {
            let parking = await Parking.findOne({ "_id": req.body.booking_id, "parking_number": req.body.parking_number });
            if (parking === null) {
                res.status(200).send("No booking with this Booking Id && Parking Number \nor \nTime Over for Booking Confirmation. Book again and wait for 15 minutes to Confirm.");
            } else {
                parking = await Parking.findByIdAndUpdate(parking._id, { parking_confirmation: true }, { new: true });
                res.status(200).json(responseObject(parking));
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    booking: async (req, res) => {
        try {
            const bookedParking = await bookedParkingNumber();
            if (bookedParking.length >= totalParkingNumbers) {
                res.status(200).send('Parking Space Full.');
            } else {
                const reserved = req.body.differently_abled || req.body.pregnent_women;
                if (req.body.parking_number === null) {
                    let newParking;
                    if (reserved) { newParking = new Parking(bookingSlot(bookedParking, true, req.body)); }
                    if (order.parking_number === undefined) { newParking = new Parking(bookingSlot(bookedParking, false, req.body)); }
                    const parking = await newParking.save();
                    bookingCancel(parking._id, parking.booking_time);
                    res.status(201).json(responseObject(parking));
                } else if (req.body.parking_number > totalParkingNumbers) {
                    res.status(200).send('Parking Number : ' + req.body.parking_number + ' requested for Booking is not Valid. \nParking Number greater than total space for Booking.');
                } else {
                    const alreadybooked = await Parking.findOne({ "parking_number": req.body.parking_number });
                    if (alreadybooked === null) {
                        const newParking = new Parking(parkingModel(req.body, req.body.parking_number, reserved));
                        const parking = await newParking.save();
                        bookingCancel(parking._id, parking.booking_time);
                        res.status(201).json(responseObject(parking));
                    } else {
                        res.status(200).send('Parking Number : ' + req.body.parking_number + ' Not Availble for Booking');
                    }
                }
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

}