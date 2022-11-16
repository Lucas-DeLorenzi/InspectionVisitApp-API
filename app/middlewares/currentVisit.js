const { Visit } = require('../models/index')
const fs = require('fs');

module.exports = async (req, res, next) => {
    let currentVisit = await Visit.findOne({
        where: { finishDate: null }
    })
    if (!currentVisit) {
        if (req.file) {
            fs.unlinkSync(`${req.file.destination}${req.file.filename}`)
        }
        res.status(404).json({ msg: "No existe una visita en curso", error: true });
    } else {
        req.currentVisit = currentVisit;
        next();
    }
}