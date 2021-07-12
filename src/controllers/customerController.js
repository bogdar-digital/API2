var fs = require("fs");
const controller = {};

controller.list = (req, res) => {
  if (!req.session.username) {
    res.redirect("/login");
  } else {
    req.getConnection((err, conn) => {
      conn.query(
        "SELECT * FROM customer where id_user =" + req.session.id_user,
        (err, customers) => {
          if (err) {
            console.warn("Error conn mysql" + err);
            res.json(err);
          }
          console.log(req.session);
          res.render("customers", {
            data: customers,
            session: req.session,
            JSON: null,
          });
        }
      );
    });
  }
};

controller.save = (req, res) => {
  const data = req.body;
  console.log(data);
  req.getConnection((err, conn) => {
    conn.query("INSERT INTO customer set ?", [data], (err, customer) => {
      if (err) {
        console.warn("Error conn mysql" + err);
        res.json(err);
      }
      res.redirect("/list");
    });
  });
};

controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM customer WHERE id = ?", [id], (err, customer) => {
      if (err) {
        console.warn("Error conn mysql" + err);
        res.json(err);
      }
      res.render("customer_edit", {
        data: customer[0],
      });
    });
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const newCustomer = req.body;
  req.getConnection((err, conn) => {
    conn.query(
      "UPDATE customer set ? WHERE id = ?",
      [newCustomer, id],
      (err, rows) => {
        if (err) {
          console.warn("Error conn mysql" + err);
          res.json(err);
        }
        res.redirect("/list");
      }
    );
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;

  req.getConnection((err, conn) => {
    conn.query("DELETE FROM customer WHERE id = ?", [id], (err, rows) => {
      if (err) {
        console.warn("Error conn mysql" + err);
        res.json(err);
      }
      res.redirect("/list");
    });
  });
};

controller.JSON = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(
      "SELECT * FROM customer where id_user =" + req.session.id_user,
      (err, customers) => {
        if (err) {
          console.warn("Error conn mysql" + err);
          res.json(err);
        }
        var fileName = "dataCustomer.json";
        fs.writeFile(
          fileName,
          JSON.stringify(customers, null, 4),
          function (err2) {
            if (err2) {
              console.warn("Error conn mysql" + err2);
              res.json(err2);
            } else {
              res.download(fileName);
              res.render("customers", {
                data: customers,
                session: req.session,
                JSON: JSON.stringify(customers, null, 4).trim(),
              });
            }
          }
        );
      }
    );
  });
};

controller.JSONFile = (req, res) => {
  var fileName = "dataCustomer.json";
  res.download(fileName);
};

module.exports = controller;
