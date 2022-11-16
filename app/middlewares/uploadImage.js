const multer = require('multer')
const path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error())
        }
        callback(null, true)
    },
    limits: {
        fileSize: 1024 * 1024
    }
}).single('image');

module.exports = (req, res, next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.status(500).json({ msg: "Ocurrió un error inesperado en la carga del archivo", data: err, error: true })
            return;
        } else if (err) {
            res.status(400).json({ msg: "Solo pueden cargarse archivos de tipo imagen", data: err, error: true })
            return;
        }
        next();
    })
};