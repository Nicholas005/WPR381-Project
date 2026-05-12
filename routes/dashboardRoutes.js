const express = require("express")
const router = express.Router()

const { isLoggedIn } = require("../middleware/authMiddleware");
const { isAdmin }    = require("../middleware/adminMiddleware");
const dashboardController = require("../controllers/dashboardController");

//Dashboards
router.get("/admin", isLoggedIn, isAdmin, dashboardController.getDashboard);

router.get("/user", isLoggedIn, dashboardController.getDashboard);

module.exports = router;

