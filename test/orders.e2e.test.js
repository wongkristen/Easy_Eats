process.env.NODE_ENV = "test";

let chai = require('chai');
let server = require('../server/app');
let chaiHttp = require('chai-http');
let should = chai.should();
let firebaseObjContainer = require("../server/routes/protected");

// console.log(firebaseObjContainer.firebase);

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
                    // console.log(res.body);
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
            chai.request(server.app)
                .get('/api/getalltable')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('table1');
                    res.body.should.have.property('table2');
                    res.body.should.have.property('table3');
                    res.body.should.have.property('table4');
                    res.body.should.have.property('table5');
                    res.body.should.have.property('table6');
                    done();
                });
        })
    });

    /* JUST A SINGLE TABLE */
    describe('/GET request, /getsingletable', () => {
        let PickedOutTableNum = 'table1';
        it('should get a single table', (done) => {
            chai.request(server.app)
                .get(`/api/getsingletable?id=${PickedOutTableNum}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('bill_total');
                    res.body.should.have.property('id');
                    res.body.should.have.property('num_of_customer');
                    res.body.should.have.property('orders');
                    res.body.should.have.property('status');
                    res.body.should.have.property('time_in');
                    res.body.should.have.property('tip');
                    res.body.should.have.property('waiter_assigned');
                    console.log(res.body);
                    done();
                });
        })
    });

    /* UPDATE THE SPECIFIC FOOD PROPERTY */
    describe('/POST request, /updatefood', () => {
        it('should update a food', (done) => {
            done();
        })
    });

    /* SET A NEW WAITER AND REMOVE THE OLD WAITER */
    describe('/GET request, /setwaiter', () => {
        it('should update the waiter to a new one', (done) => {
            done();
        })
    });

});





