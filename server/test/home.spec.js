import { expect } from 'chai';
import supertest from 'supertest';
import server from '../index';

const api = supertest(server);

describe('/home', () => {
  it('should return a welcome message', (done) => {
    api.get('/')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});
