const { User, Role } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = {
    signIn(req, res) {
        let { email, password } = req.body;

        User.findOne({
            where: {
                email: email
            },
            include: {
                model: Role,
                attributes: ["name"]
            }
        }).then(user => {
            if (!user) {
                res.status(404).json({ msg: "Credenciales inválidas" })
            } else {
                if (bcrypt.compareSync(password, user.password)) {
                    let token = jwt.sign({ id: user.id, name: `${user.firstName} ${user.lastName}`, email: user.email, role: user.Role.name }, authConfig.secret, { expiresIn: authConfig.expires });
                    res.json({
                        token: token
                    })
                } else {
                    res.status(401).json({ msg: "Ocurrio un error" })
                }
            }
        }).catch(err => {
            res.status(500).json(err);
        })
    },
}