'use strict';

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';

const encrypt = (password) => {
    const iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv(algorithm, 'YXFQGE0V7G0X1JKA0WH8DDK7XWBGUGY6', iv);
    let encrypted = cipher.update(password);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedPwd: encrypted.toString('hex') };
};

const decrypt = (password) => {
    let iv = Buffer.from(password.iv, 'hex');
    let encryptedText = Buffer.from(password.encryptedPwd, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', 'YXFQGE0V7G0X1JKA0WH8DDK7XWBGUGY6', iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};

module.exports = {
    encrypt,
    decrypt
};