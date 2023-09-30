const jwt = require("jsonwebtoken");
// const config = require("../config/authConfig");
// const db = require("../models");
// const User = db.user;

verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];


    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log(err.message)
            return res.status(401).json({ message: err.message });
        }
        req.user = decoded;
        next();
    });
};

const authJwt = {
    verifyToken,
};
module.exports = authJwt;