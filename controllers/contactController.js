const Enquiry = require('../Schemas/Enquiries')

exports.getContact = (req, res) => {
    res.render("contact", { title: "contact" })
}

exports.postContact = async (req, res, next) => {
    try {
        // Problem with saving this due to how databse is setup
        // { name, email, subject, message, isResolved, submittedAt }
        await Enquiry.create({
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message
        });

        res.render("contact", {success: "Your message has been sent successfully!"})
    } catch (err) {
        res.render("contact", {error: err.message})
    }
}