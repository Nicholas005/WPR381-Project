const Enquiry = require('../Schemas/Enquiries')

exports.getContact = (req, res) => {
    res.render("contact", { title: "contact" })
}

exports.postContact = async (req, res, next) => {
    try {
        
        await Enquiry.create({
            UserID: req.user.id,
            Enquiry: req.body.message
        }); 
        await Enquiry.save();

        res.render("contact", {success: "Your message has been sent successfully!"})
    } catch (err) {
        res.render("contact", {error: err.message})
    }
}