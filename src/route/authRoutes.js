const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const authJwt = require('../middleware/jwt-middleware');



router.get("/getUserData", [authJwt.verifyToken],  authController.getDataByUser);


module.exports = router;