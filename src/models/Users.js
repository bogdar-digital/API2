var fs = require('fs');

const getAll = (req) => {
    return new Promise((resolve, reject) => {
        req.getConnection((err, conn) => {
            if (err) reject(err)
            conn.query("SELECT * FROM user", (err, rows) => {
                if (err) reject(err)
                console.log(rows);
                resolve(rows);
            });
        });
    });
};
module.exports = {
    getAll : getAll()
};