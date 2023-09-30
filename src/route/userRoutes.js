const express = require('express');
const router = express.Router();
const authController = require('../controller/userController');



router.post("/register", authController.register);
router.post("/login", authController.login)
router.get("/Santri", authController.getAllSantri)


module.exports = router;