'use strict';
const multer = require('multer');

const createSingle = () => {
    const destination = multer({dest: 'src/temp/'});
    return destination.single('tempFile')
};

const multerMiddleware = multer({
    storage: multer.memoryStorage()
});

module.exports = {
    createSingle,
    multerMiddleware
};