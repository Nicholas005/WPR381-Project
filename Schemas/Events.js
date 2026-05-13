const mongoose = require("mongoose");
const { type } = require("node:os");

const EventSchema = new mongoose.Schema({
  Name:     { type: String, required: true },
  Capacity: { type: Number, required: true },
  Bookings: { type: Number, default: 0 },
  Date:     { type: Date,   required: true },
  Category: { type: String, required: true },
  TicketPrice: { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model("Events", EventSchema);

/*
import as
const Event = require('./Schemas/Events');

queried as:
const allEvents = await Event.find();
*/