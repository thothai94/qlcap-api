class XL_Get_token {
    getToken() {
        const crypto = require('crypto');
        const timestamp = (Date.now() / 1000 | 0).toString();
        const hash = crypto.createHash('sha256');

        const userNonce = 'FO#123456789';
        const userKey = '43ec38ff104afe162846add812c9c7c82b296e9b7c87b695b94226048b01ee3d';

        const encrypted = hash.update(`${timestamp}${userKey}`).digest('hex');
        const authToken = `${userNonce}:${timestamp}:${encrypted}`;
        return authToken;
    }
}

var Token = new XL_Get_token()
module.exports = Token