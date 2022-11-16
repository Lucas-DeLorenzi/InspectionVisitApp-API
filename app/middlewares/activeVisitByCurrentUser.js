const { Visit } = require('../models/index')

module.exports = async (req, res, next) => {
    let visit = await Visit.findOne({ where: { UserId: req.currentUser?.id, finishDate: null } });
    if (!visit) {
        next();
    } else {
        res.status(404).json({ msg: "Usted ya tiene una visita en curso", error: true });
    }
}