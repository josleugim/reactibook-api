'use strict';
const { addFile } = require('../services/cloudStorage');
const { mimeType } = require('../helpers/validators');

const uploadCtrl = async (req, res) => {
    const myFiles = req.files;
    const folder = req.query.folder || '';
    const uploadImages = [];
    if (myFiles && !mimeType(myFiles)) {
        await myFiles.map(file => {
            uploadImages.push(addFile(file, folder, file.mimetype))
        });

        Promise.all(uploadImages)
            .then((fileNames) => {
                res.status(200).json({ status: 'success', fileNames: fileNames });
            })
            .catch(err => console.error(err))
    } else {
        res.status(400).json({ status: 'error', message: 'Invalid file' });
    }
};

module.exports = {
    uploadCtrl
};