const express = require("express")
const router = express.Router()

const contactController = require("../controllers/contactController")
const { isLoggedIn } = require("../middleware/authMiddleware");

//Contact
router.get("/", isLoggedIn, contactController.getContact)
router.post("/", isLoggedIn, contactController.postContact)

module.exports = router