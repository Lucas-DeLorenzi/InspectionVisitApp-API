const { Visit, User, ObservedValues } = require('../models/index');

module.exports = {
    async getAllVisits(req, res) {
        try {
            let visits = await Visit.findAll({
                include: [{
                    model: User,
                    attributes: ["firstName", "lastName"]
                }, {
                    model: ObservedValues,
                }]
            });
            res.status(200).json(visits);
        } catch (err) {
            res.status(500).json({
                msg: 'Ocurrió un error inesperado',
                data: err,
                error: true,
            });
        }
    },

    async getCurrentVisit(req, res) {
        try {
            let currentVisit = await Visit.findOne({
                where: { finishDate: null },
                include: [{
                    model: User,
                    attributes: ["firstName", "lastName"]
                }, {
                    model: ObservedValues,
                }]
            })
            res.status(200).json(currentVisit);
        } catch (err) {
            res.status(500).json({
                msg: 'Ocurrió un error inesperado',
                data: err,
                error: true,
            });
        }
    },

    async createNewVisit(req, res) {
        try {
            if (req.currentUser.Role.name === "EMPLOYEE") {
                await Visit.create({
                    creationDate: new Date,
                    UserId: req.currentUser.id,
                })
                res.status(201).json({ msg: "Visita creada con exito!", error: false });
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

    async finishVisit(req, res) {
        try {
            let visit = await Visit.findOne({ where: { UserId: req.currentUser.id, finishDate: null } });
            if (req.currentUser.Role.name === "EMPLOYEE" && visit) {
                await Visit.update({
                    finishDate: new Date
                }, { where: { id: visit.id, UserId: req.currentUser.id } })
                res.status(201).json({ msg: "Visita finalizada con exito!", error: false });
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