'use strict';

const mimeType = files => {
    const mimeTypes = ['image/png', 'image/jpeg'];

    const hasValidMimeTypes = files.map(file => {
        return mimeTypes.indexOf(file.mimetype) > -1
    });
    return hasValidMimeTypes.indexOf(false) > -1;
};

module.exports = {
    mimeType
};