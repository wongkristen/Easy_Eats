process.env.NODE_ENV = "test";

let chai = require('chai');
let server = require('../server/app');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);


/* UNIT TESTING */
describe('Orders', () => {

    /* GRAB ALL DATA NO MATTER WHAT PROPERTY */
    describe('/GET request , /getalldata', () => {
        /* should have no problem grabing the data */
        it('should get all the data', (done) => {
            chai.request(server.app)
                .get('/api/getalldata')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('Current_Tables');
                    done();
                });
        });
    });

    /* GRAB ALL THE TABLE PROPERTIES ONLY */
    describe('/GET request, /getalltable', () => {
        it('should get all the tables', (done) => {
            console.log("Testing works");
            done();
        })
    });

    /* JUST A SINGLE TABLE */
    describe('/GET request, /getsingletable', () => {
        it('should get a single table', (done) => {
            console.log("Testing works");
            done();
        })
    });

    /* UPDATE THE SPECIFIC FOOD PROPERTY */
    describe('/POST request, /updatefood', () => {
        it('should update a food', (done) => {
            console.log("Testing works");
            done();
        })
    });

    /* SET A NEW WAITER AND REMOVE THE OLD WAITER */
    describe('/GET request, /setwaiter', () => {
        it('should update the waiter to a new one', (done) => {
            console.log("Testing works");
            done();
        })
    });

});





