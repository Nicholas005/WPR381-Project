const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        return next();
    }

    return res.status(403).render("error", {
        message: "Access denied. This page is for admins only."
    });
};

module.exports = { isAdmin };