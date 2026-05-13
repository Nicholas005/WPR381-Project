const Booking = require('../Schemas/Bookings');
const Event = require('../Schemas/Events');

exports.postBooking = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.eventId);
        const tickets = parseInt(req.body.tickets) || 1;

        if (!event) return next(new Error('Event not found'));

        // Check enough spots available
        const available = event.Capacity - event.Bookings;
        if (tickets > available) {
            return res.redirect('/events?error=not-enough-spots');
        }

        // Check if user already booked this event
        const existing = await Booking.findOne({
            EventID: event._id,
            UserID: req.user.id
        });

        if (existing) {
            return res.redirect('/events?error=already-booked');
        }

        await Booking.create({
            EventID: event._id,
            UserID: req.user.id,
            Tickets: tickets
        });

        await Event.findByIdAndUpdate(event._id, {
            $inc: { Bookings: tickets }
        });

        res.redirect('/dashboard/user?success=booked');

    } catch (err) {
        next(err);
    }
}

exports.editBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id);
        const newTickets = parseInt(req.body.tickets);

        if (!booking) return next(new Error('Booking not found'));

        if (booking.UserID.toString() !== req.user.id) {
            return res.status(403).redirect('/dashboard/user');
        }

        const event = await Event.findById(booking.EventID);
        const ticketDifference = newTickets - booking.Tickets;

        // Check if enough spots available for the increase
        const available = event.Capacity - event.Bookings;
        if (ticketDifference > available) {
            return res.redirect('/dashboard/user?error=not-enough-spots');
        }

        // Update booking and adjust event bookings count
        await Booking.findByIdAndUpdate(req.params.id, { Tickets: newTickets });
        await Event.findByIdAndUpdate(booking.EventID, {
            $inc: { Bookings: ticketDifference }
        });

        res.redirect('/dashboard/user');

    } catch (err) {
        next(err);
    }
}

exports.cancelBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) return next(new Error('Booking not found'));

        // Make sure the user owns this booking
        if (booking.UserID.toString() !== req.user.id) {
            return res.status(403).redirect('/dashboard/user');
        }

        // Give the spots back to the event
        await Event.findByIdAndUpdate(booking.EventID, {
            $inc: { Bookings: -booking.Tickets }
        });

        await Booking.findByIdAndDelete(req.params.id);

        res.redirect('/dashboard/user');

    } catch (err) {
        next(err);
    }
}