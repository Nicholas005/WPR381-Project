const express = require("express")
const router = express.Router()

//middleware & contoller
const { isLoggedIn } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware")
const eventController = require("../controllers/eventController")

//Admin only Event Management
router.get("/", isLoggedIn, isAdmin, eventController.getEvent);
router.post("/", isLoggedIn, isAdmin, eventController.postCreateEvent);
router.post("/:id/delete", isLoggedIn, isAdmin, eventController.deleteEvent);
router.get("/:id/edit", isLoggedIn, isAdmin, eventController.getEditEvent);
router.post("/:id/edit", isLoggedIn, isAdmin, eventController.postEditEvent);
router.get("/:id/attendees", isLoggedIn, isAdmin, eventController.getEventAttendees);
router.post("/:id/attendees/:bookingId/cancel", isLoggedIn, isAdmin, eventController.adminCancelBooking);
router.post("/:id/attendees/:bookingId/edit", isLoggedIn, isAdmin, eventController.adminEditBooking);

module.exports = router