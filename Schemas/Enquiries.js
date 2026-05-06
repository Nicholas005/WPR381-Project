const mongoose = require("mongoose");

const InquirySchema = new mongoose.Schema({
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",          // References the User collection like a foreign key from an ERD
    required: true
  },
  Enquiry: { type: String, required: true }
});

module.exports = mongoose.model("Inquiry", InquirySchema);