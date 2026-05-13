const Booking = require('../Schemas/Bookings');
const Event = require('../Schemas/Events');

exports.dashboardRedirect = (req, res) => {
    if (req.user && req.user.role === "admin") {
        return res.redirect("/dashboard/admin");
    }
    return res.redirect("/dashboard/user");
}

exports.getDashboardAdmin = async (req, res, next) => {
    try {
        const totalBookings = await Booking.countDocuments();
        const totalEvents = await Event.countDocuments();
        const events = await Event.find();
        res.render("dashboard-admin", { totalBookings, totalEvents, events });
    } catch (err) {
        next(err);
    }
}

exports.getDashboardUser = async (req, res, next) => {
    try {
        const bookings = await Booking.find({ UserID: req.user.id }).populate('EventID');
        const totalTickets = bookings.length;
        res.render("dashboard-user", { bookings, totalTickets });
    } catch (err) {
        next(err);
    }
}