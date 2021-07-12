var fs = require('fs');
const { send } = require('process');

const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM customer", (err, customers) => {
            if (err) {
                console.warn("Error conn mysql" + err);
                res.json(err);
            }
            res.send(customers);
        });
    });
};


controller.listOne = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM customer WHERE id = ?", [id], (err, customer) => {
            if (err) {
                console.warn("Error conn mysql" + err);
                res.json(err);
            }
            if (customer[0]) {
                res.send(customer[0]);
            } else {
                console.warn("Error conn mysql" + err);
                res.send("El registro con id '" + [id] + "' no existe.");
            }
        });
    });
};


controller.save = (req, res) => {
    const data = req.body;
    data.id = 0;
    req.getConnection((err, conn) => {
        conn.query("INSERT INTO customer set ?", [data], (err, customer) => {
            if (err) {
                console.warn("Error conn mysql" + err);
                res.json(err);
            }
            res.redirect("/api/show/" + customer.insertId);
        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const newCustomer = req.body;
    newCustomer.id = [id];
    req.getConnection((err, conn) => {
        conn.query("UPDATE customer set ? WHERE id = ?", [newCustomer, id], (err, rows) => {
            if (err) {
                console.warn("Error conn mysql" + err);
                res.json(err);
            }
            if (rows.affectedRows < 1) {
                res.send("El registro con id '" + [id] + "' no existe.");
            }
            conn.query("SELECT * FROM customer WHERE id = ?", [id], (err2, customer) => {
                if (err2) {
                    console.warn("Error conn mysql" + err2);
                    res.json(err2);
                }
                res.send(customer[0]);

            });
        });
    });
};


controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM customer WHERE id = ?", [id], (err, customer) => {
            if (customer[0]) {
                conn.query("DELETE FROM customer WHERE id = ?", [id], (err2, rows) => {
                    if (err2) {
                        console.warn("Error conn mysql" + err2);
                        res.send("Error al eliminar el registro con id '" + [id] + "'.");
                    }
                    res.send("Eliminación del registro con id " + [id] + " exitoso.");
                });
            } else {
                console.warn("Error conn mysql" + err);
                res.send("El registro con id '" + [id] + "' no existe.");
            }
        });
    });
};


module.exports = controller;