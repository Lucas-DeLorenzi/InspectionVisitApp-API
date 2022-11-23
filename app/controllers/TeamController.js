const { Team } = require('../models/index');
const authConfig = require('../../config/auth');


module.exports = {
    async getAllTeams(req, res) {
        try {
            if (req.currentUser.Role.name === "ADMIN") {
                let teams = await Team.findAll({});
                res.status(200).json(teams);
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