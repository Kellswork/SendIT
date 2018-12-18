import { expect } from 'chai';
import supertest from 'supertest';
import server from '../index';

const api = supertest(server);

describe('tests for user controller', () => {
  describe('/POST create user', () => {
    const user = {
      firstName: 'uche',
      lastName: 'chinda',
      email: 'chinda@gmail.com',
      password: '12345',
      phoneNumber: '09088776654',
      userName: 'uchebabe',
    };

    it('should create a new user', (done) => {
      api.post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('success');
          expect(res.body.success).to.equal(true);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('message');
          expect(res.body.data.message).to.equal('user was successfully created');
          expect(res.body.data).to.have.property('token');
          expect(res.body.data.token).to.equal(res.body.data.token);
          expect(res.body.data).to.have.property('user');
          expect(res.body.data.user).to.equal(res.body.data.user);
          expect(res.header).to.have.property('x-auth-token');
          done();
        });
    });
  });
  describe('/POST user login', () => {
    const user = {
      email: 'chinda@gmail.com',
      password: '12345',
    };
    it('should login a user', (done) => {
      api.post('/api/v1/auth/login')
        .set('Content-Type', 'application/json')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('success');
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('token');
          expect(res.body).to.have.property('user');
          done();
        });
    });
  });
  describe('validation for user signup', () => {
    const invalidUser = {
      firstName: 'kells',
      lastName: 'june',
    };

    const user = {
      firstName: 'uche',
      lastName: 'chinda',
      email: 'chinda@gmail.com',
      password: '12345',
      phoneNumber: '09088776654',
    };

    it('it should return a 400 error', (done) => {
      api.post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .send(invalidUser)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('success');
          expect(res.body).to.have.property('error');
          done();
        });
    });


    it('it should return a 400 error', (done) => {
      api.post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('success');
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });
  describe('throw 500 error for database error', () => {
    const user = {
      firstName: 'uche',
      lastName: 'chinda',
      email: 'chinda@gmail.com',
      password: 12345,
      phoneNumber: '09088776654',
      userName: 'uchebabe',
    };
    it('it should return a 500 error', (done) => {
      api.post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('success');
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });
});
