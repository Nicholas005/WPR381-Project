const express = require("express")
const router = express.Router()

const contactController = require("../controllers/contactController")

//Contact
router.get("/", contactController.getContact)
router.post("/", contactController.postContact)

module.exports = router