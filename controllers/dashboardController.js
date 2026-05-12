exports.dashboardRedirect = (req, res) => {
    console.log(req.user)
    if (req.user && req.user.role === "admin") {
        return res.redirect("/dashboard/admin");
    }
    else {
        return res.redirect("/dashboard/user");
    }
}

exports.getDashboardAdmin = (req, res) => {
    res.render("dashboard-admin");
}

exports.getDashboardUser = (req, res) => {
    res.render("dashboard-user");
}