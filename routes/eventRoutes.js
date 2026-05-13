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

module.exports = router