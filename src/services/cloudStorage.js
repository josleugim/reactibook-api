'use strict';

const { Storage } = require('@google-cloud/storage');
const path = require('path');
const serviceKey = path.join(__dirname, '../../keys.json');
const {v4: uuidv4} = require('uuid');

const addFile = async (file, folder, mimeType) => {
    return new Promise((resolve, reject) => {
        const storage = new Storage({
            keyFilename: serviceKey,
            projectId: process.env.PROJECT_ID,
        });
        const bucket = storage.bucket(process.env.BUCKET);
        const { originalname, buffer } = file;
        const randomName = uuidv4();
        const blob = bucket.file(`${folder}/${randomName}`);
        const blobStream = blob.createWriteStream({
            resumable: false,
            metadata: {
                contentType: mimeType
            }
        });

        blobStream
            .on('finish', () => {
                resolve(randomName)
            })
            .on('error', (err) => {
                reject(err)
            })
            .end(buffer);
    })
};

module.exports = {
    addFile
};