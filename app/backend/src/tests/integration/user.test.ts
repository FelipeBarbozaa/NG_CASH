/* eslint-disable */
import sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import app from '../../app';
import User from '../../database/models/User';
import Account from '../../database/models/Account';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests POST method for /register', () => {
  describe('if the request is made with an invalid user', () => {
    let chaiHttpResponse: Response;

    it('Return the status code 400', async () => {
      chaiHttpResponse = await chai.request(app).post('/register').send({
        username: 'ab',
        password: '1234567A',
        repassword: '1234567A'
      });
      expect(chaiHttpResponse).to.have.status(400);
    });

    it('Return an object with a key "message"', () => {
      expect(chaiHttpResponse.body).to.have.key('message');
    });

    it('The message is "username must be at least 3 characters long"', () => {
      expect(chaiHttpResponse.body.message).to.be.equal('username must be at least 3 characters long');
    });
  });
  describe('If the request is made with an invalid password', () => {
    let chaiHttpResponse: Response;

    it('Return the status code 400', async () => {
      chaiHttpResponse = await chai.request(app).post('/register').send({
        username: 'felipe',
        password: '123',
        repassword: '123'
      });
      expect(chaiHttpResponse).to.have.status(400);
    });

    it('Return an object with a key "message"', () => {
      expect(chaiHttpResponse.body).to.have.key('message');
    });

    it('The message is "password must have 8 digits, a capital letter and a number"', () => {
      expect(chaiHttpResponse.body.message).to.be.equal('password must have 8 digits, a capital letter and a number');
    });
  });

  describe('If the request is made with different password', () => {
    let chaiHttpResponse: Response;
  
    it('Return the status code 400', async () => {
      chaiHttpResponse = await chai.request(app).post('/register').send({
        username: 'felipe',
        password: '12345678A',
        repassword: '87654321A'
      });
      expect(chaiHttpResponse).to.have.status(400);
    });

    it('Return an object with a key "message"', () => {
      expect(chaiHttpResponse.body).to.have.key('message');
    });

    it('The message is "password must be the same"', () => {
      expect(chaiHttpResponse.body.message).to.be.equal('password must be the same');
    });
  })

  describe('If the request is made with an existing user', () => {
    let chaiHttpResponse: Response;

    before(() => {
      sinon.stub(User, 'findOne').resolves(true as any);
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    })

    it('Return the status code 409', async () => {
      chaiHttpResponse = await chai.request(app).post('/register').send({
        username: 'felipe',
        password: '1234567A',
        repassword: '1234567A'
      });

      expect(chaiHttpResponse).to.have.status(409)
    })

    it('Return an object with a key "error"', () => {
      expect(chaiHttpResponse.body).to.have.key('error');
    });

    it('The message is "User already exists"', () => {
      expect(chaiHttpResponse.body.error).to.be.equal('User already exists');
    });
  })

  describe('If the request is successful', () => {
    let chaiHttpResponse: Response;

    before(() => {
      sinon.stub(User, 'findOne').resolves(false as any);
      sinon.stub(User, 'create').resolves({ id: '123', accountId: '321'} as any)
      sinon.stub(Account, 'create').resolves()
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
      (User.create as sinon.SinonStub).restore();
      (Account.create as sinon.SinonStub).restore();
    })

    it('Return the status code 201', async () => {
      chaiHttpResponse = await chai.request(app).post('/register').send({
        username: 'felipe',
        password: '1234567A',
        repassword: '1234567A'
      });

      expect(chaiHttpResponse).to.have.status(201)
    })

    it('Return an object with keys "token", "id" and "accountId"', () => {
      expect(chaiHttpResponse.body).to.have.keys(["id", "token", "accountId"]);
    })
  })
});

describe('Tests POST method for /login', () => {
  describe('If the request is made with a invalid user', () => {
    let chaiHttpResponse: Response;

    it('Return the status code 400', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        username: 'ab',
        password: '1234567A',
        repassword: '1234567A'
      });
      expect(chaiHttpResponse).to.have.status(400);
    });

    it('Return an object with a key "message"', () => {
      expect(chaiHttpResponse.body).to.have.key('message');
    });

    it('The message is "username must be at least 3 characters long"', () => {
      expect(chaiHttpResponse.body.message).to.be.equal('username must be at least 3 characters long');
    });
  })

  describe('If the request is made with an invalid password', () => {
    let chaiHttpResponse: Response;

    it('Return the status code 400', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        username: 'felipe',
        password: '123',
      });
      expect(chaiHttpResponse).to.have.status(400);
    });

    it('Return an object with a key "message"', () => {
      expect(chaiHttpResponse.body).to.have.key('message');
    });

    it('The message is "password must have 8 digits, a capital letter and a number"', () => {
      expect(chaiHttpResponse.body.message).to.be.equal('password must have 8 digits, a capital letter and a number');
    });
  });

  describe('If the user doesnt exists', () => {
    let chaiHttpResponse: Response;

    before(() => {
      sinon.stub(User, 'findOne').resolves(false as any);
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    })

    it('Return the status code 400', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        username: 'felipe',
        password: '1234567A',
      });
      expect(chaiHttpResponse).to.have.status(404);
    });

    it('Return an object with a key "error"', () => {
      expect(chaiHttpResponse.body).to.have.key('error');
    });

    it('The message is "User or password incorrect"', () => {
      expect(chaiHttpResponse.body.error).to.be.equal('User or password incorrect');
    });
  });

  describe('If the password doesnt match', () => {
    let chaiHttpResponse: Response;

    before(() => {
      sinon.stub(User, 'findOne').resolves({ password: 'wrongpassword'} as any);
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    })

    it('Return the status code 400', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        username: 'felipe',
        password: '1234567A',
      });
      expect(chaiHttpResponse).to.have.status(404);
    });

    it('Return an object with a key "error"', () => {
      expect(chaiHttpResponse.body).to.have.key('error');
    });

    it('The message is "User or password incorrect"', () => {
      expect(chaiHttpResponse.body.error).to.be.equal('User or password incorrect');
    });
  });

  describe('If the request is successful', () => {
    let chaiHttpResponse: Response;

    before(() => {
      sinon.stub(User, 'findOne').resolves({ id: '123', accountId: '321', password: '8f3ba5fd2beac46774ceba7798b4e2c4'} as any);
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    })

    it('Return the status code 400', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        username: 'felipe',
        password: '1234567A',
      });
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('Return an object with a key "token", "id", "accountId"', () => {
      expect(chaiHttpResponse.body).to.have.keys(["token", "id", "accountId"]);
    });
  });
})