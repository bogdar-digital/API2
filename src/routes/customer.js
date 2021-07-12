const express = require("express");
const router = express.Router();


const customerController = require("../controllers/customerController");

const apiController = require("../controllers/apiController");


router.get("/list", customerController.list);

router.post("/add", customerController.save);
router.delete("/delete/:id", customerController.delete);

router.get("/update/:id", customerController.edit);
router.put("/update/:id", customerController.update);

router.get("/showJSON", customerController.JSON);

router.get("/downloadJSON", customerController.JSONFile);

//API

router.get("/api/show", apiController.list);

router.get("/api/show/:id", apiController.listOne);

router.post("/api/add", apiController.save);

router.put("/api/update/:id", apiController.update);

router.delete("/api/delete/:id", apiController.delete);


module.exports = router;