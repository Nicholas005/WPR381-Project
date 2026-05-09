const express = require("express")
const app = express()

// Routes
app.use('/', require("./routes/homeRoutes"))                //Home / Event Listing
app.use('/auth', require("./routes/authRoutes"))            //User Authentication
app.use('/admin', require("./routes/eventRoutes"))          //Event Management
app.use('/dashboard', require("./routes/dashboardRoutes"))  //Booking & Dashboard
app.use('/contact', require("./routes/contractRoutes"))     //Contact / Enquiries

// Views
app.set("view engine", "ejs")
app.use(express.static("public"))

module.exports = app