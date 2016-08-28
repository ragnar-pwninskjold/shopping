global.DATABASE_URL = 'mongodb://localhost/shopping-list-test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');
var Item = require('../models/item');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('Shopping List', function() {
    before(function(done) {
        server.runServer(function() {
            Item.create({name: 'Broad beans'},
                        {name: 'Tomatoes'},
                        {name: 'Peppers'}, function() {
                done();
            });
        });
    });

    it('should list items on get', function(done) {
        chai.request(app)
        .get('/items')
        .end(function(err, res) {
            should.equal(err, null);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body.should.have.length(3);
            res.body[0].should.be.a('object');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('name');
            res.body[0]._id.should.be.a('string');
            res.body[0].name.should.be.a('string');
            res.body[0].name.should.equal('Broad beans');
           // res.body[1].name.should.equal('Tomatoes');
            //res.body[2].name.should.equal('Peppers');
            done();
        });
    });

    it('should add an item on post', function(done) {
        chai.request(app)
            .post('/items')
            .send({'name': 'Kale'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('_id');
                res.body.name.should.be.a('string');
                res.body._id.should.be.a('string');
                res.body.name.should.equal('Kale');
               // chai.request(app).get('/items').end(function(err, res) {res.body.should.have.length(4);});
                done();
            });
    });

      /* it('should edit an item on put', function(done) {
        chai.request(app)
            .put('/items/2')
            .send({'name':'ham'})
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                storage.items[2].name.should.equal('ham');
                done();
            });
    }); */

    /*
    it('should delete an item on delete', function(done) {
    chai.request(app)
    .delete('/items/2')
    .end(function(err, res) {
        res.should.have.status(200);
        //storage.items.should.have.length(3);
        done();
    });
    });
    */ 

    after(function(done) {
        Item.remove(function() {
            done();
        });
    });
});



