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
    describe('/GET request , /api/getalldata', () => {
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
    describe('/GET request, /api/getalltable', () => {
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
    describe('/GET request, /api/getsingletable?id=\<tableNumber\> ', () => {
        let PickedOutTableNum = 'table1';
        it('should get a single table', (done) => {
            chai.request(server.app)
                .get(`/api/getsingletable?id=${PickedOutTableNum}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        /* Should have all the necessary properties to maintain */
        it('should have all the necessary properties', (done) => {
            /* Make sure we have all the properties */
            chai.request(server.app)
                .get(`/api/getsingletable?id=${PickedOutTableNum}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    // console.log(res.body);
                    res.body.should.have.property('bill_total');
                    res.body.should.have.property('id');
                    res.body.should.have.property('num_of_customer');
                    res.body.should.have.property('orders');
                    res.body.should.have.property('status');
                    res.body.should.have.property('time_in');
                    res.body.should.have.property('tip');
                    res.body.should.have.property('waiter_assigned');
                    done();
                });
        });
        /* Make sure the order property is an array */
        it('should have an array for the order property', (done) => {
            chai.request(server.app)
                .get(`/api/getsingletable?id=${PickedOutTableNum}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.orders.should.be.a('array');
                    done();
                });
        });
        /* Make sure the id matches a table number */
        it('should have id match with the correct table number', (done) => {
            let PickedOutId = '902852';
            chai.request(server.app)
                .get(`/api/getsingletable?id=${PickedOutTableNum}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(PickedOutId);
                    // console.log(res.body);
                    done();
                });
        });

    });

    /* UPDATE THE SPECIFIC FOOD PROPERTY */
    describe('/POST request, /api/updatefood', () => {
        let table = {
           "table": "table2",
            "orders": [
                {
                    "order_name": "Drinks",
                    "price": 2.99,
                    "special_request": "no cheese"
                },
                {
                    "order_name": "Drinks",
                    "price": 2.99,
                    "special_request": "no cheese"
                }
            ]
        };
        it('should update a food', (done) => {
            chai.request(server.app)
                .post('/api/updatefood')
                .send(table)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.a.property('message').eql('Successfully updated the table');
                    res.body.should.have.a.property('table').eql('table2');
                    res.body.should.have.a.property('orders').eql(table.orders);
                    res.body.orders.should.be.a('array');
                    res.body.orders.length.should.be.eql(2);
                    done();
                });
        })
    });

    /* SET A NEW WAITER AND REMOVE THE OLD WAITER */
    describe('/POST request, /api/setwaiter', () => {
        let bodyObj = {
            "waiter": "Kevin Tran",
            "table": "table3"
        } ;
        /* Make sure the response comes back as a Success */
        it('should update the waiter to a new one', (done) => {
            chai.request(server.app)
                .post('/api/setwaiter')
                .send(bodyObj)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.a.property('message').eql('Success');
                    done();
                });
        });
        /* Make sure the table goes in right with the right value */
        it('should match the input waiter with the ouput waiter', (done) => {

            chai.request(server.app)
                .post('/api/setwaiter')
                .send(bodyObj)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.a.property('waiter_name').eql(bodyObj.waiter);
                    done();
                });
        });
        /* Make sure the table number is correct */
        it('should match the input table number with the ouput table number', (done) => {
            chai.request(server.app)
                .post('/api/setwaiter')
                .send(bodyObj)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.a.property('table').eql(bodyObj.table);
                    done();
                });
        })
    });

});





