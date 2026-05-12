const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const connectDB = require("./Connection");
const errorMiddleware = require("./middleware/errorMiddleware");
const { setLocals } = require("./middleware/localsMiddleware");

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());                            // parse application/json bodies
app.use(express.urlencoded({ extended: false }));   // parse HTML form submissions
app.use(cookieParser());                            // parse the JWT cookie on every request

// Views
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

// Locals middleware
app.use(setLocals);

// Routes
app.use('/', require("./routes/homeRoutes"))                //Home / Event Listing
app.use('/auth', require("./routes/authRoutes"))            //User Authentication
app.use('/admin', require("./routes/eventRoutes"))          //Event Management
app.use('/dashboard', require("./routes/dashboardRoutes"))  //Booking & Dashboard
app.use('/contact', require("./routes/contactRoutes"))     //Contact / Enquiries

// Error handling
app.use(errorMiddleware.notFound)
app.use(errorMiddleware.errorHandler)

module.exports = app