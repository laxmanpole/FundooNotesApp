//import the controller and express
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();
var server = require('../server')
var fs = require('fs');

function test() {

    var data = fs.readFileSync('/home/admin1/Desktop/FundooApp/server/test/test1.json');
    var data1 = JSON.parse(data);
    return data1;
}

describe('Status and content', function() {
    describe('Registration page', function() {
        var data1 = test();
        it('status ', function(done) {
            console.log(data1.register);
            chai.request(server).post('/register').send(data1.register).end((err, res) => {
                if (err) {
                    console.log("expect ==>", err);
                    err.should.have.status(500);
                } else {
                    console.log("expect ==>", res.body);
                    res.should.have.status(200);

                    describe('Login page', function() {
                        it('status ', function(done) {
                            chai.request(server).post('/login').send(data1.login).end((err, res) => {
                                if (err) {
                                    console.log("expect ==>", err);
                                } else {
                                    console.log("expect ==>", res.body);
                                    res.should.have.status(200);

                                    describe('Forgot Password page', function() {
                                        it('status ', function(done) {
                                            chai.request(server).post('/forgotPassword').send(data1.forgotPassword).end((err, res) => {
                                                if (err) {
                                                    console.log("expect ==>", err);
                                                    err.should.have.status(500);
                                                } else {
                                                    console.log("expect ==>", res.body);
                                                    res.should.have.status(200);

                                                    describe('Reset Password page', function() {
                                                        it('status ', function(done) {
                                                            chai.request(server).post('/resetPassword').send(data1.resetPassword).end((err, res) => {
                                                                if (err) {
                                                                    console.log("expect ==>", err);
                                                                    err.should.have.status(500);
                                                                } else {
                                                                    console.log("expect ==>", res.body);
                                                                    res.should.have.status(200);
                                                                }
                                                                done();
                                                            })
                                                        })
                                                    })
                                                }
                                                done();
                                            })
                                        })
                                    })
                                }

                                done();
                            })
                        })
                    })
                }
                done();
            })
        })
    })
})
describe('Status and content', function() {
    describe('create label', function() {
         var data1 = test();
        it('status ', function(done) {
            chai.request(server).post('/create').send(data1.createLabel).end((err, res) => {
                if (err) {
                    console.log("expect ==>", err);
                    err.should.have.status(500);
                } else {
                    console.log("expect ==>", res.body);
                    res.should.have.status(200);
                }
                done();
            })
        })
    })
})