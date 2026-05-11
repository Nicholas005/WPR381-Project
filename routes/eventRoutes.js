const express = require("express")
const router = express.Router()

// Admin only Event Management
router.get("/events", (req, res) => {
  res.send("Events route working")
})

module.exports = router