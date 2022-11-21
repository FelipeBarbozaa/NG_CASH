/* eslint-disable */
import sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import app from '../../app';
import Transaction from '../../database/models/Transaction';
import User from '../../database/models/User';

chai.use(chaiHttp);

const transactionResult = {
  id: '123',
  debitedAccountId: '1234',
  creditedAccountId: '12345',
  value: 100,
  createdAt: '19/11/2022 15:54:22'
}

const { expect } = chai;

describe('Tests GET for /cashout/:id', () => {
  describe('If request is successfull', () => {
    let chaiHttpResponse: Response;

    before(() => {
      sinon.stub(Transaction, 'findAll').resolves([transactionResult] as any)
      sinon.stub(User, 'findOne').resolves({ username: 'userteste' } as any)
    })

    after(() => {
      (Transaction.findAll as sinon.SinonStub).restore();
      (User.findOne as sinon.SinonStub).restore();
    })
  
    it('Return the status code 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/cashout/1234')
      console.log(chaiHttpResponse.body)
      expect(chaiHttpResponse).to.have.status(200);
    })
  })
  describe('If request is successfull', () => {
    let chaiHttpResponse: Response;

    before(() => {
      sinon.stub(Transaction, 'findAll').resolves([transactionResult] as any)
      sinon.stub(User, 'findOne').resolves({ username: 'userteste' } as any)
    })

    after(() => {
      (Transaction.findAll as sinon.SinonStub).restore();
      (User.findOne as sinon.SinonStub).restore();
    })
  
    it('Return the status code 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/cashin/1234')
      console.log(chaiHttpResponse.body)
      expect(chaiHttpResponse).to.have.status(200);
    })
  })
})