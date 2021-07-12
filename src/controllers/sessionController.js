var fs = require('fs');

const controller = {};

controller.home = (req, res) => {
    if (!req.session.username) {
        res.redirect("/login")
    } else {
        res.redirect("/list")
    }
};

controller.logout = (req, res) => {
    req.session.destroy();
    console.log(req.session);
    res.redirect("/")
};

controller.login = (req, res) => {
    res.render("login", {error: false});
};

controller.logon = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM user", (err, rows) => {
            if (err) {
                console.warn("Error conn mysql" + err);
                res.render("login", {error: err})
            }
            for (elem of rows) {
                if (elem.email == data.email && elem.password == data.password) {
                    req.session.id_user = elem.id
                    req.session.username = elem.username;
                    req.session.email = elem.email;
                }
            }
            console.log(req.session);
            if (!req.session.username) {
                res.render("login", {error: "credenciales invalidas"})
            } else {
                res.redirect("/list")
            }
        });
    });
};
controller.save = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query("INSERT INTO user set ?", [data], (err, customer) => {
            if (err) {
                console.warn("Error conn mysql" + err)
            }
            res.redirect("/list");
        });
    });
};

controller.registryUser = (req, res) => {
    res.render("user");
};


controller.saveUser = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query("INSERT INTO user set ?", [data], (err, customer) => {
            if (err) {
                console.warn("Error conn mysql" + err)

            }
            res.redirect("/login");
        });
    });
};

module.exports = controller;