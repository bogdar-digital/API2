const express = require("express");
const router = express.Router();


const sessionController = require("../controllers/sessionController");


router.get('/', sessionController.home);

router.get('/logout', sessionController.logout);

router.get("/login", sessionController.login);

router.post("/logon", sessionController.logon);

router.get("/registry", sessionController.registryUser);

router.post("/registry", sessionController.saveUser);


module.exports = router;