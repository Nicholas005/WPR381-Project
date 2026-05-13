const mongoose = require("mongoose");
const { type } = require("node:os");

const BookingSchema = new mongoose.Schema({
  
    EventID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Events",         // References the Event collection, similar to a foreign key in an ERD
    required: true
  },
  
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",          // References the User collection, similar to a foreign key in an ERD
    required: true
  },
  Tickets: { type: Number, required: true }
});

module.exports = mongoose.model("Bookings", BookingSchema);

/*
should be able to be imported using the following line
const Booking = require('./Schemas/Booking');

then you can query the collection such as this:
const allBookings = await Booking.find();
*/
