'use strict';
const multer = require('multer');

const createSingle = () => {
    const destination = multer({dest: 'src/temp/'});
    return destination.single('tempFile')
};

module.exports = {
    createSingle
};