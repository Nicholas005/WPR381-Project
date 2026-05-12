const express = require("express")
const router = express.Router()

const homeContoller = require("../controllers/homeController")

//Booking
router.get("/", homeContoller.getHome)

module.exports = router