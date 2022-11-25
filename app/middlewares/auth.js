const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth')
const { User, Role } = require('../models/index');

module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).json({ msg: "No autorizado" })
    } else {
        let token = req.headers.authorization.split(" ")[1]

        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err) {
                res.status(401).json({ msg: "Ha ocurrido un problema al verificar el token", err })
            } else {
                User.findByPk(decoded.id, { include: { model: Role, attributes: ["name"] } }).then(user => {
                    req.currentUser = user;
                    next();
                })
            }
        });
    }
}