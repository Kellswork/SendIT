/* eslint-env node, mocha */
import { expect } from 'chai';
import supertest from 'supertest';
import server from '../index';

const api = supertest(server);


describe('Get all users', () => {
  it('should return all users created', (done) => {
    api.get('/api/v1/users')
      .set('Content-Type', 'application/json')
      .send()
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('success');
        expect(res.body).to.have.property('details');
        expect(res.body.success).to.equal(true);
        expect(res.body.details).to.be.a('array');
        done();
      });
  });
});

describe('Get one user', () => {
  it('should get a specific user', (done) => {
    api.get('/api/v1/users/103')
      .set('Content-Type', 'application/json')
      .send()
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('success');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('details');
        expect(res.body.details).to.be.a('object');
        expect(res.body.details).to.be.have.property('name');
        expect(res.body.details).to.be.have.property('email');
        expect(res.body.details).to.be.have.property('userId');
        expect(res.body.details).to.be.a('object');
        done();
      });
  });

  it('should return 404 if user is not found', (done) => {
    api.get('/api/v1/users/4')
      .set('Content-Type', 'application/json')
      .send()
      .expect(404)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('success');
        expect(res.body).to.have.property('error');
        expect(res.body.success).to.equal(false);
        done();
      });
  });
});
describe('Get a specific parcel delivery', () => {
  it('should get a specific parcel delivery order', (done) => {
    api.get('/api/v1/parcels/2')
      .set('Content-Type', 'application/json')
      .send()
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('success');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('details');
        expect(res.body.details).to.be.a('object');
        expect(res.body.details).to.be.have.property('name');
        expect(res.body.details).to.be.have.property('productName');
        expect(res.body.details).to.be.have.property('pickupAddress');
        expect(res.body.details).to.be.have.property('destinationAddress');
        done();
      });
  });

  it('should return 404 if parcel delivery order is not found', (done) => {
    api.get('/api/v1/parcels/8')
      .set('Content-Type', 'application/json')
      .send()
      .expect(404)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('success');
        expect(res.body).to.have.property('error');
        expect(res.body.success).to.equal(false);
        done();
      });
  });
});

describe('Create a parcel delivery order', () => {
  it('should create a parcel delivery order', (done) => {
    const parcel = {
      name: 'della tabel',
      productName: 'ring lights',
      pickupAddress: 'no 2 fox road detox avenue apapa lagos',
      destinationAddress: 'no 2 allen avenue oshodi lagos',
      status: 'pending',
    };
    api.post('/api/v1/parcels/')
      .set('Content-Type', 'application/json')
      .send(parcel)
      .expect(201)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.details).to.be.a('array');
        expect(res.body).to.have.property('success');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('details');
        done();
      });
  });

  it('should return 404 if user does not send details required', (done) => {
    const parcel = {
      productName: 'ring lights',
      pickupAddress: 'no 2 fox road detox avenue apapa lagos',
      destinationAddress: 'no 2 allen avenue oshodi lagos',
    };
    api.post('/api/v1/parcels/')
      .set('Content-Type', 'application/json')
      .send(parcel)
      .expect(400)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('success');
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

describe('Cancel a parcel delivery order', () => {
  it('should return a status code of 406 if order delivery status is delivered', (done) => {
    api.put('/api/v1/parcels/1/cancel')
      .set('Content-Type', 'application/json')
      .send()
      .expect(406)
      .end((err, res) => {
        expect(res.status).to.deep.equal(406);
        done();
      });
  });

  it('should return a status code of 406 if order delivery status is cancelled', (done) => {
    api.put('/api/v1/parcels/7/cancel')
      .set('Content-Type', 'application/json')
      .send()
      .expect(406)
      .end((err, res) => {
        expect(res.status).to.equal(406);
        done();
      });
  });

  it('Should update parcel delivery order status to cancelled ', (done) => {
    api.put('/api/v1/parcels/6/cancel')
      .set('Content-Type', 'application/json')
      .send()
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('success');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('details');
        expect(res.body.details).to.have.property('name');
        expect(res.body.details).to.have.property('productName');
        expect(res.body.details).to.have.property('pickupAddress');
        expect(res.body.details).to.have.property('destinationAddress');
        expect(res.body.details).to.have.property('status');
        expect(res.body.details.status).to.equal('cancelled');

        done();
      });
  });
});

describe('Get all parcel delivery order by a specific user', () => {
  it('should get all parcel delivery order a specific user has created', (done) => {
    api.get('/api/v1/users/103/parcels')
      .set('Content-Type', 'application/json')
      .send()
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('success');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('details');
        expect(res.body.success).to.equal(true);
        expect(res.body.details).to.be.a('array');
        done();
      });
  });

  it('should retutn a status of 404 if user has not created any parcel delivery order', (done) => {
    api.get('/api/v1/users/106/parcels')
      .set('Content-Type', 'application/json')
      .send()
      .expect(404)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('success');
        expect(res.body).to.have.property('error');
        expect(res.body.success).to.equal(false);
        done();
      });
  });
});
