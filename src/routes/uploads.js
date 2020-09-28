'use strict';
const { tokenMiddleware } = require('../middlewares/jwtMiddleware');
const { multerMiddleware } = require('../services/multer');
const { uploadCtrl } = require('../controllers/UploadCtrl');

module.exports = app => {
    app.post(
        '/api/uploads',
        tokenMiddleware,
        multerMiddleware.array('file', 1),
        (req, res) => uploadCtrl(req, res)
        )
};