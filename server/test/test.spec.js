/* eslint-env node, mocha */
import { expect } from 'chai';
import supertest from 'supertest';
import server from '../index';

const api = supertest(server);
describe('/api/v1/parcels', () => {
  afterEach((done) => {
    server.close();
    done();
  });

  describe('Get all parcel delivery', () => {
    it('should get all parcel delivery order', (done) => {
      api.get('/api/v1/parcels')
        .set('Content-Type', 'application/json')
        .send()
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('parcel');
          expect(res.body.parcel).to.be.a('array');
          done();
        });
    });
  });

  describe('Get a specific parcel delivery', () => {
    it('should get a specific parcel delivery order ', (done) => {
      api.get('/api/v1/parcels/2')
        .set('Content-Type', 'application/json')
        .send()
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('Details');
          expect(res.body.Details).to.be.a('object');
          expect(res.body.Details).to.be.have.property('name');
          expect(res.body.Details).to.be.have.property('productName');
          expect(res.body.Details).to.be.have.property('pickupAddress');
          expect(res.body.Details).to.be.have.property('destinationAddress');
          done();
        });
    });

    it('Should return 404 if parcel delivery order is not found', (done) => {
      api.get('/api/v1/parcels/8')
        .set('Content-Type', 'application/json')
        .send()
        .expect(404)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });

  describe('Cancel a parcel delivery order', () => {
    it('Should update the status to canceled ', (done) => {
      api.put('/api/v1/parcels/3/cancel')
        .set('Content-Type', 'application/json')
        .send()
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('Details');
          expect(res.body.Details).to.have.property('name');
          expect(res.body.Details).to.have.property('productName');
          expect(res.body.Details).to.have.property('pickupAddress');
          expect(res.body.Details).to.have.property('destinationAddress');
          expect(res.body.Details).to.have.property('status');
          expect(res.body.Details.status).to.equal('canceled');

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
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('Details');
          expect(res.body).to.have.property('Details');
          expect(res.body.Details).to.be.a('array');
          done();
        });
    });
  });
});
