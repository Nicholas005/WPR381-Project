exports.getHome = (req, res) => {
    res.render("index", {title: "Home"});
}

exports.getEvents = async (req, res, next) => {
    try {
        const Event = require('../Schemas/Events');
        const events = await Event.find();
        res.render("events", { title: "Events", events });
    } catch (err) {
        next(err);
    }
}