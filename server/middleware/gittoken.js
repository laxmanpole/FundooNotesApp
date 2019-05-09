const jwt = require('jsonwebtoken');
module.exports = {
    GenerateToken(payload) {
        const token = jwt.sign({ payload }, 'secretkey')
        return token;
    }
}