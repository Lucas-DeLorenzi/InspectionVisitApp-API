const { User } = require('../models/index')

module.exports = async (req, res, next) => {
    let userToUpd = await User.findByPk(req.params.id);
    if (!userToUpd) {
        res.status(404).json({ msg: "Usuario inexistente", error: true });
    } else {
        req.user = userToUpd;
        next();
    }
}