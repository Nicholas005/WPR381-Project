const express = require("express")
const { route } = require("../app")
const router = express.Router()

//Admin only Event Management
route.get("/events", () => {

})

module.exports = router