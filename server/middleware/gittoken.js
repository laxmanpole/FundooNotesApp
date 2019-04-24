const jwt = require('jsonwebtoken');
module.exports = {
    GenerateToken(payload) {
        const token = jwt.sign({ payload }, 'secretkey') //expires in two hours

        return token;
    }
}