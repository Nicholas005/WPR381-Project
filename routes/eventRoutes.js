const express = require("express")
const router = express.Router()

//middleware & contoller
const { isLoggedIn } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware")
const eventController = require("../controllers/eventController")

//Admin only Event Management
router.get("/events", isLoggedIn, isAdmin, eventController.getEvent);

module.exports = router