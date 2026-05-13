const Event = require('../Schemas/Events');

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
        const { name, category, date, capacity } = req.body;
        await Event.create({ Name: name, Category: category, Date: date, Capacity: capacity, Bookings: 0 });
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
        const { name, category, date, capacity } = req.body;
        await Event.findByIdAndUpdate(req.params.id, {
            Name: name, Category: category, Date: date, Capacity: capacity
        });
        res.redirect('/admin/events');
    } catch (err) {
        next(err);
    }
}