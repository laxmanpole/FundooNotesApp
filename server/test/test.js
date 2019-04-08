var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var server = require('../server')


describe('Status and content', function() {
    describe('Main page', function() {
        var requestBody = {
            // "firstname": "Ganesh",
            // "lastname": "pole",
            "email": "pole@gmail.com",
            "password": "12345"
        }
        it('status', function() {
            chai.request(server)
                .post('/login')
                .send(requestBody)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
    })
})