const { User, Team } = require('../models/index');
const bcrypt = require('bcrypt');
const authConfig = require('../../config/auth');


module.exports = {
    async getAllUsers(req, res) {
        try {
            if (req.currentUser.Role.name === "ADMIN") {
                let users = await User.findAll({
                    include: {
                        model: Team,
                        attributes: ["name"]
                    }
                });
                res.status(200).json(users);
            } else {
                res.status(401).json({ msg: "No autorizado" })
            }
        } catch (err) {
            res.status(500).json({
                msg: 'Ocurrió un error inesperado',
                data: err,
                error: true,
            });
        }
    },

    async createUser(req, res) {
        try {
            if (req.currentUser.Role.name === "ADMIN") {
                let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
                await User.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: password,
                    TeamId: req.body.TeamId,
                    RoleId: req.body.RoleId
                })
                res.status(201).json({ msg: "Usuario creado con exito!", error: false });
            } else {
                res.status(401).json({ msg: "No autorizado" })
            }
        } catch (err) {
            res.status(500).json({
                msg: 'Ocurrió un error inesperado',
                data: err,
                error: true,
            });
        }
    },
    async updateUser(req, res) {
        try {
            if (req.currentUser.Role.name === "ADMIN" || req.currentUser.Role.name === "EMPLOYEE") {
                req.body.password ? { ...req.body, password: bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds)) } : req.body
                await User.update(
                    req.body.password ? { ...req.body, password: bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds)) } : req.body,
                    { where: { id: req.params.id } }
                )
                res.status(200).json({ msg: "Usuario actualizado con exito!", error: false });
            } else {
                res.status(401).json({ msg: "No autorizado" })
            }
        } catch (err) {
            res.status(500).json({
                msg: 'Ocurrió un error inesperado',
                data: err,
                error: true,
            });
        }
    },

    async deleteUser(req, res) {
        try {
            if (req.currentUser.Role.name === "ADMIN") {
                await User.destroy(
                    { where: { id: req.params.id } }
                )
                res.status(200).json({ msg: "Usuario borrado con exito!", error: false });
            } else {
                res.status(401).json({ msg: "No autorizado" })
            }
        } catch (err) {
            res.status(500).json({
                msg: 'Ocurrió un error inesperado',
                data: err,
                error: true,
            });
        }
    }
}