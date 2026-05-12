const express = require("express");
const router = express.Router();

// 1. Show the Contact Page
router.get("/", (req, res) => {
    // This tells Express to look for "contact.ejs" in your views folder
    res.render("contact", { title: "Get in Touch" }); 
});

// 2. Handle the Form Submission
router.post("/", (req, res) => {
    console.log("Form data received:", req.body);
    
    // For now, just redirect back to the contact page so it doesn't hang
    // Later, your backend person will add database logic here
    res.redirect("/contact?success=true");
});

module.exports = router;