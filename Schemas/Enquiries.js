const mongoose = require("mongoose");
const { type } = require("node:os");

const EnquirySchema = new mongoose.Schema({
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",          // References the User collection like a foreign key from an ERD
    required: true
  },
  Enquiry: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Enquiries", EnquirySchema);



/*
import as
const Enquiry = require('./Schemas/Enquiries');

queried as:
const allEnquiries = await Enquiry.find();
*/