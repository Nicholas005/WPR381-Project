const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  
    EventID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",         // References the Event collection, similar to a foreign key in an ERD
    required: true
  },
  
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",          // References the User collection, similar to a foreign key in an ERD
    required: true
  },
  Tickets: { type: Number, required: true }
});

module.exports = mongoose.model("Booking", BookingSchema);