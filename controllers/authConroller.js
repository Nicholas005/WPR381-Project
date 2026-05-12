exports.getLogin = (req, res) => {
    res.render("auth");
}

exports.postLogin = (req, res) => {
    throw new Error("Not implemented yet");
}

exports.getRegister = (req, res) => {
    res.render("auth");
}

exports.postRegister = (req, res) => {
    throw new Error("Not implemented yet");
}