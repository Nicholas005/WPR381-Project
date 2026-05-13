const Enquiry = require('../Schemas/Enquiries')

exports.getContact = (req, res) => {
    res.render("contact", { title: "contact" })
}

exports.postContact = async (req, res, next) => {
    try {
        
        await Enquiry.create({
            UserID: req.user.id,
            Subject: req.body.subject,
            Enquiry: req.body.message
        }); 

        res.render("contact", { title: "contact", success: "Your message has been sent successfully!" });
    } catch (err) {
        res.render("contact", {error: err.message})
    }
}