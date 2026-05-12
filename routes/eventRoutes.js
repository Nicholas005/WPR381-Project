const express = require("express")
const router = express.Router()

//middleware & contoller
const { isAdmin } = require("../middleware/adminMiddleware")
const eventController = require("../controllers/eventController")

//Admin only Event Management
router.get("/events", isAdmin, eventController.getEvent)

module.exports = router