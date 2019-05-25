//import the controller and express
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();
var server = require('../server')
var fs = require('fs');
var ltoken;
var ftoken;
var userID;
var labelID;

function test() {

    var data = fs.readFileSync('/home/admin1/Desktop/FundooApp/server/test/test1.json');
    var data1 = JSON.parse(data);
    return data1;
}

describe('Status and content', function() {
    var data1 = test();
    describe('Registration page', function() {

        it('status ', function(done) {
            chai.request(server).post('/register').send(data1.register).end((err, res) => {
                if (err) {
                    console.log("expect ==>", err);
                    err.should.have.status(500);
                } else {
                    console.log("registration token ==>", res.body);
                    //var rtoken = res.body.token
                    res.should.have.status(200);
                }
                done();
            })
        })
    });
    // describe("verifyEmail", function() {
    //     var data1 = test();
    //     it('status ', function(done) {
    //         chai.request(server).post(`/verifyEmail/${rtoken}`).set('token', rtoken).send(data1.verifyEmail).end((err, res) => {
    //             if (err) {
    //                 console.log("expect ==>", err);
    //                 err.should.have.status(500);
    //             } else {
    //                 console.log("expect ==>", res.body);

    //                 res.should.have.status(200);
    //             }
    //             done();
    //         })
    //     })
    // });
    describe('login page', function() {
        //var data1 = test();
        it('status ', function(done) {
            chai.request(server).post('/login').send(data1.login).end((err, res) => {
                if (err) {
                    console.log("expect ==>", err);
                    err.should.have.status(500);
                } else {
                    console.log("expect ==>", res.body.token);
                    ltoken = res.body.token
                    console.log("userid mil raha hai===>", res.body.data[0]._id)
                    userID = res.body.data[0]._id
                    res.should.have.status(200);
                }
                done();
            })
        })
    });
    describe('forgot Password', function() {
        // var data1 = test();
        it('status ', function(done) {
            chai.request(server).post('/forgotPassword').send(data1.forgotPassword).end((err, res) => {
                if (err) {
                    console.log("expect ==>", err);
                    err.should.have.status(500);
                } else {
                    console.log("forgot password token ==>", res.body.token);
                    ftoken = res.body.token
                    res.should.have.status(200);
                }
                done();
            })
        })
    });
    describe('reset Password', function() {
        //var data1 = test();
        it('status ', function(done) {
            chai.request(server).post(`/resetPassword/${ftoken}`).set('token', ftoken).send(data1.resetPassword).end((err, res) => {
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
    });
})
describe('Status and content', function() {
    var data1 = test();
    describe('create label', function() {

        it('status ', function(done) {
            chai.request(server).post('/create').set('token', ltoken).send(data1.createLabel).end((err, res) => {
                if (err) {
                    console.log("expect ==>", err);
                    err.should.have.status(500);
                } else {
                    console.log("expect ==>", res.body);
                    console.log("label id ==>", res.body.response);
                    labelID = res.body.response._id
                    res.should.have.status(200);
                }
                done();
            })
        })
    });

    describe('findall label', function() {
        // var data1 = test();
        it('status ', function(done) {
            chai.request(server).get('/findAll').send({ "userID": userID }).end((err, res) => {
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
    });

    describe('update label', function() {
        //var data1 = test();
        var labelName = data1.updateLabel.labelName
        it('status ', function(done) {
            chai.request(server).put('/update').send({ "labelName": labelName, "_id": labelID }).end((err, res) => {
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
    });

    describe('delete label', function() {
        //var data1 = test();
        var labelName = data1.updateLabel.labelName
        it('status ', function(done) {
            chai.request(server).delete('/delete').send({ "labelName": labelName, "_id": labelID }).end((err, res) => {
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
    });
})
describe('Status and content', function() {
    var data1 = test();
    describe('create note', function() {

        it('status ', function(done) {
            chai.request(server).post('/createNote').set('token', ltoken).send(data1.createnote).end((err, res) => {
                if (err) {
                    console.log("expect ==>", err);
                    err.should.have.status(500);
                } else {
                    console.log("expect ==>", res.body);
                    console.log("label id ==>", res.body.response);
                    // labelID = res.body.response._id
                    res.should.have.status(200);
                }
                done();
            })
        })
    });
    describe('find All note', function() {

        it('status ', function(done) {
            chai.request(server).get('/findAllNote').set('token', ltoken).end((err, res) => {
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
    });
    describe('Add label to note', function() {

        it('status ', function(done) {
            chai.request(server).put('/addlabeltoNote').send(data1.addlabeltoNote).end((err, res) => {
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
    });
    describe('Remove label from note', function() {

        it('status ', function(done) {
            chai.request(server).put('/removelabelfromNote').send(data1.removelabelfromNote).end((err, res) => {
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
    });
    describe('Update label from note', function() {

        it('status ', function(done) {
            chai.request(server).put('/updateNote').send(data1.updateNote).end((err, res) => {
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
    });
    // describe('Delete note', function() {

    //     it('status ', function(done) {
    //         chai.request(server).delete('/deleteNote').send(data1.deleteNote).end((err, res) => {
    //             if (err) {
    //                 console.log("expect ==>", err);
    //                 err.should.have.status(500);
    //             } else {
    //                 console.log("expect ==>", res.body);
    //                 res.should.have.status(200);
    //             }
    //             done();
    //         })
    //     })
    // });
    describe('set reminder', function() {

        it('status ', function(done) {
            chai.request(server).post('/setreminder').send(data1.setreminder).end((err, res) => {
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
    });
    describe('delete reminder', function() {

        it('status ', function(done) {
            chai.request(server).post('/deletereminder').send(data1.deletereminder).end((err, res) => {
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
    });
})
describe('Status and content', function() {
    var data1 = test();
    describe(' Archive', function() {

        it('status ', function(done) {
            chai.request(server).post('/Archive').send(data1.isArchive).end((err, res) => {
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
    });
    describe(' Trash', function() {

        it('status ', function(done) {
            chai.request(server).post('/Trash').send(data1.isTrash).end((err, res) => {
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
    });
})
describe('Status and content', function() {
    var data1 = test();
    describe(' Collaborator', function() {

        it('status ', function(done) {
            chai.request(server).post('/noteCollaborate').set('token', ltoken).send(data1.notecollaborate).end((err, res) => {
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
    });
    describe(' Search Note By Title', function() {

        it('status ', function(done) {
            chai.request(server).post('/searchNoteByTitle').set('token', ltoken).send(data1.searchNoteByTitle).end((err, res) => {
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
    });
    describe(' Search Note By Description', function() {

        it('status ', function(done) {
            chai.request(server).post('/searchNoteByDescription').set('token', ltoken).send(data1.searchNoteByDescription).end((err, res) => {
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
    });

})