const express = require("express")
const router = express.Router()

const homeController = require("../controllers/homeController")

//Booking
router.get("/", homeController.getHome)
router.get("/events", homeController.getEvents)  // public event listing
router.get("/events/:id", homeController.getEventDetail)

module.exports = router
