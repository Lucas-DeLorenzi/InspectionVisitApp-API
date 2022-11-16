const { ObservedValues, SubCategory } = require('../models/index');


module.exports = {
    async getObservedValuesByVisit(req, res) {
        try {
            let observedValues = await ObservedValues.findAll({
                where: { VisitId: req.params.id },
                include: {
                    model: SubCategory,
                    attributes: ["CategoryId", "name"]
                }
            });
            res.status(200).json(observedValues);
        } catch (err) {
            res.status(500).json({
                msg: 'Ocurrió un error inesperado',
                data: err,
                error: true,
            });
        }
    },

    async getObservedValuesForCurrentVisit(req, res) {
        try {
            let observedValues = await ObservedValues.findAll({
                where: { VisitId: req.currentVisit.id },
                include: {
                    model: SubCategory,
                    attributes: ["CategoryId", "name"]
                }
            });
            res.status(200).json(observedValues);
        } catch (err) {
            res.status(500).json({
                msg: 'Ocurrió un error inesperado',
                data: err,
                error: true,
            });
        }
    },

    async createNewObservedValues(req, res) {
        try {
            if (req.currentUser.Role.name === "EMPLOYEE") {
                await ObservedValues.create({
                    UserId: req.currentUser.id,
                    SubCategoryId: req.body.SubCategoryId,
                    VisitId: req.currentVisit.id,
                    value: req.body.value,
                    observations: req.body.observations,
                    createdAt: req.body.createdAt,
                    image: req.file ? `${req.file.destination}${req.file.filename}` : null
                })
                res.status(201).json({ msg: "Valores observados con exito!", error: false });
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

    async updateObservedValues(req, res) {
        try {
            if (req.currentUser.Role.name === "EMPLOYEE") {
                await ObservedValues.update({
                    UserId: req.currentUser.id,
                    value: req.body.value,
                    observations: req.body.observations,
                    updatedAt: new Date,
                    image: req.file ? `${req.file.destination}${req.file.filename}` : null
                },
                    { where: { id: req.params.id } }
                )
                res.status(200).json({ msg: "Valores actualizados con exito!", error: false });
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
}