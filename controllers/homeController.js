const Event = require('../Schemas/Events');

exports.getHome = async (req, res, next) => {
    try {
        const events = await Event.find().sort({ Date: 1 }).limit(6);
        const activeCount = await Event.countDocuments();
        res.render("index", { title: "Home", events, activeCount });
    } catch (err) {
        next(err);
    }
}

exports.getEvents = async (req, res, next) => {
    try {
        const events = await Event.find();
        res.render("events", { title: "Events", events });
    } catch (err) {
        next(err);
    }
}

exports.getEventDetail = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).render('error', { message: 'Event not found' });
        res.render("events", { title: "Events", events: [event] });
    } catch (err) {
        next(err);
    }
}