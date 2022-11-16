const { ObservedValues } = require('../models/index')
const fs = require('fs');

module.exports = async (req, res, next) => {
    let valuesAlreadyExists = await ObservedValues.findOne({
        where: { SubCategoryId: req.body.SubCategoryId, VisitId: req.currentVisit.id }
    })
    if (valuesAlreadyExists) {
        if (req.file) {
            fs.unlinkSync(`${req.file.destination}${req.file.filename}`)
        }
        res.status(400).json({ msg: "Ya existen valores observados para esta visita con la subcategoria solicitada", error: true });
    } else {
        next();
    }
}