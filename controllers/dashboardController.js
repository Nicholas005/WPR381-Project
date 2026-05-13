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
        const bookings = await Booking.find().populate('EventID');
        const totalRevenue = bookings.reduce((sum, b) => {
            const price = b.EventID ? (b.EventID.TicketPrice || 0) : 0;
            return sum + (price * b.Tickets);
        }, 0);
        res.render("dashboard-admin", { totalBookings, totalEvents, totalRevenue });
    } catch (err) {
        next(err);
    }
}

exports.getDashboardUser = async (req, res, next) => {
    try {
        const bookings = await Booking.find({ UserID: req.user.id }).populate('EventID');
        const totalTickets = bookings.length;
        res.render("dashboard-user", { bookings, totalTickets, user: req.user });
    } catch (err) {
        next(err);
    }
}