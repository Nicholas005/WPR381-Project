const express = require("express")
const router = express.Router()

const { isLoggedIn } = require("../middleware/authMiddleware");
const { isAdmin }    = require("../middleware/adminMiddleware");
const dashboardController = require("../controllers/dashboardController");

//Dashboards
router.get("/", isLoggedIn, dashboardController.dashboardRedirect)

router.get("/admin", isLoggedIn, isAdmin, dashboardController.getDashboardAdmin);

router.get("/user", isLoggedIn, dashboardController.getDashboardUser);

module.exports = router;

