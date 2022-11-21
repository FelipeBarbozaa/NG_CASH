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

describe('Tests GET method for /balance/:id', () => {
  describe('If account exists', () => {
    let chaiHttpResponse: Response;

    before(() => {
      sinon.stub(Account, 'findOne').resolves({ balance: 100 } as any)
    })

    after(() => {
      (Account.findOne as sinon.SinonStub).restore();
    })
  
    it('Return the status code 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/balance/123').send();
      expect(chaiHttpResponse).to.have.status(200);
    })

    it('Return an object with a key "balance"', () => {
      expect(chaiHttpResponse.body).to.have.key('balance');
    });

    it('The balance is equal to 100', () => {
      expect(chaiHttpResponse.body.balance).to.be.equal(100);
    });
  })

  describe('If account doesnt exists', () => {
    let chaiHttpResponse: Response;

    before(() => {
      sinon.stub(Account, 'findOne').resolves(null)
    })

    after(() => {
      (Account.findOne as sinon.SinonStub).restore();
    })
  
    it('Return the status code 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/balance/123').send();
      expect(chaiHttpResponse).to.have.status(200);
    })

    it('Return null"', () => {
      expect(chaiHttpResponse.body).to.be.equal(null);
    });
  })
})

describe('Tests POST method for /transfer', () => {
  describe('If the trasnfer is made with insufficient money', () => {
    let chaiHttpResponse: Response;

    before(() => {
      sinon.stub(Account, 'findOne').resolves({ balance: 100 } as any)
    })

    after(() => {
      (Account.findOne as sinon.SinonStub).restore();
    })

    it('Return the status code 400', async () => {
      chaiHttpResponse = await chai.request(app).post('/transfer').send({
        debitedAccountId: '123',
        creditedAccountUser: 'user',
        balance: 150
      })
      expect(chaiHttpResponse).to.have.status(400);
    })

    it('Return an object with a key "error"', () => {
      expect(chaiHttpResponse.body).to.have.key('error');
    });

    it('The balance is equal to 100', () => {
      expect(chaiHttpResponse.body.error).to.be.equal('You do not have enough money');
    });
  })

  describe('If the trasnfer is made to an invalid account', () => {
    let chaiHttpResponse: Response;

    before(() => {
      sinon.stub(Account, 'findOne').onCall(0)
      sinon.stub(User, 'findOne').resolves(false as any);
    })

    after(() => {
      (Account.findOne as sinon.SinonStub).restore();
      (User.findOne as sinon.SinonStub).restore();
    })

    it('Return the status code 400', async () => {
      chaiHttpResponse = await chai.request(app).post('/transfer').send({
        debitedAccountId: '123',
        creditedAccountUser: 'user',
        balance: 150
      })
      expect(chaiHttpResponse).to.have.status(400);
    })

    it('Return an object with a key "error"', () => {
      expect(chaiHttpResponse.body).to.have.key('error');
    });

    it('The message is equal to "User doesn`t exists"', () => {
      expect(chaiHttpResponse.body.error).to.be.equal('User doesn`t exists');
    });
  })
})