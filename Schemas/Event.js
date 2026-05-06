const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  Capacity: { type: Number, required: true },
  Bookings: { type: Number, default: 0 },               //sets the default to 0 as a event should star with 0 bookings made, 
  Date:     { type: Date,   required: true },           //but the admin can maybe give bookings to manditory participants
  Category: { type: String, required: true }
});

module.exports = mongoose.model("Event", EventSchema);