/* eslint-env node, mocha */
import { expect } from 'chai';
import supertest from 'supertest';
import server from '../index';

const api = supertest(server);
describe('/api/v1/parcels', () => {
  describe('Get all parcel delivery', () => {
    afterEach((done) => {
      server.close();
      done();
    });

    it('it should get all parcel delivery order', (done) => {
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
});
