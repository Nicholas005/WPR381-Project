const Event = require('../Schemas/Events');
const Booking = require('../Schemas/Bookings');
const User = require('../Schemas/Users');

exports.getEvent = async (req, res, next) => {
    try {
        const events = await Event.find();
        res.render("admin-events", { events });
    } catch (err) {
        next(err);
    }
}

exports.postCreateEvent = async (req, res, next) => {
    try {
        const { name, category, date, capacity, ticketPrice } = req.body;
        await Event.create({ Name: name, Category: category, Date: date, Capacity: capacity, Bookings: 0, TicketPrice: parseFloat(ticketPrice) || 0});
        res.redirect('/admin/events');
    } catch (err) {
        next(err);
    }
}

exports.deleteEvent = async (req, res, next) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.redirect('/admin/events');
    } catch (err) {
        next(err);
    }
}

exports.getEditEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);
        res.render('admin-events-edit', { event });
    } catch (err) {
        next(err);
    }
}

exports.postEditEvent = async (req, res, next) => {
    try {
        const { name, category, date, capacity, ticketPrice } = req.body;
        await Event.findByIdAndUpdate(req.params.id, {
            Name: name, Category: category, Date: date, Capacity: capacity, TicketPrice: parseFloat(ticketPrice) || 0
        });
        res.redirect('/admin/events');
    } catch (err) {
        next(err);
    }
}

exports.getEventAttendees = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);
        const bookings = await Booking.find({ EventID: req.params.id }).populate('UserID');
        res.render('admin-event-attendees', { event, bookings });
    } catch (err) {
        next(err);
    }
}

exports.adminCancelBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.bookingId);
        if (!booking) return next(new Error('Booking not found'));

        await Event.findByIdAndUpdate(booking.EventID, {
            $inc: { Bookings: -booking.Tickets }
        });

        await Booking.findByIdAndDelete(req.params.bookingId);
        res.redirect('/admin/events/' + req.params.id + '/attendees');
    } catch (err) {
        next(err);
    }
}

exports.adminEditBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.bookingId);
        const newTickets = parseInt(req.body.tickets);
        const ticketDifference = newTickets - booking.Tickets;

        const event = await Event.findById(req.params.id);
        const available = event.Capacity - event.Bookings;

        if (ticketDifference > available) {
            return res.redirect('/admin/events/' + req.params.id + '/attendees?error=not-enough-spots');
        }

        await Booking.findByIdAndUpdate(req.params.bookingId, { Tickets: newTickets });
        await Event.findByIdAndUpdate(req.params.id, {
            $inc: { Bookings: ticketDifference }
        });

        res.redirect('/admin/events/' + req.params.id + '/attendees');
    } catch (err) {
        next(err);
    }
}