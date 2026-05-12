const express = require("express")
const app = express()

const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/errorMiddleware")

// Routes
app.use('/', require("./routes/homeRoutes"))                //Home / Event Listing
app.use('/auth', require("./routes/authRoutes"))            //User Authentication
app.use('/admin', require("./routes/eventRoutes"))          //Event Management
app.use('/dashboard', require("./routes/dashboardRoutes"))  //Booking & Dashboard
app.use('/contact', require("./routes/contractRoutes"))     //Contact / Enquiries

// Views
app.set("view engine", "ejs") 
app.set("views", "./views");
app.use(express.static("public"))
app.use(cookieParser())

// Error handling
app.use(errorMiddleware.notFound)
app.use(errorMiddleware.errorHandler)

module.exports = app