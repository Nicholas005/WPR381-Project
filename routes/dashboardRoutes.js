const express = require("express")
const { route } = require("../app")
const router = express.Router()

//Dashboards
route.get("/admin", (req, res) => {

})

route.get("/user", (req, res) => {
    
})

module.exports = router