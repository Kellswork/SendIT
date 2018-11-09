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

  describe('Create a parcel delivery order', () => {
    it('Should create a parcel delivery order and return it', (done) => {
      const oneParcel = {
        name: 'Henry Sampson',
        productName: 'laptop charger',
        pickupAddress: 'No 7 chain wake street opposite white house surulele portharcourt',
        destinationAddress: 'No 20 airforce junction opposite white house bustop portharcourt',
      };

      api.post('/api/v1/parcels')
        .set('Content-Type', 'application/json')
        .send(oneParcel)
        .expect(201)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('Details');
          done();
        });
    });
  });
});
