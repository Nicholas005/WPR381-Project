const express = require("express")
const router = express.Router()

//middleware & contoller
const { isLoggedIn } = require("../middleware/authMiddleware")
const authController = require("../controllers/authConroller")

//Login Page
router.get("/login", authController.getLogin)
router.post("/login", authController.postLogin)
 
// Register Page
router.get("/register", authController.getRegister)
router.post("/register", authController.postRegister)

module.exports = router