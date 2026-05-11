const express = require("express")
const { route } = require("../app")
const router = express.Router()

//Booking
route.get("/", (req, res) => {
 res.render("index")
})

module.exports = router


