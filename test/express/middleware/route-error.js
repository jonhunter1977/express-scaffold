'use strict';

const sinonExpressMock = require('sinon-express-mock');

const routeError = require('../../../src/express/middleware/route-error.js');
const RouteErrorObject = require('../../../src/express/objects/route-error.js');

describe('Route error middleware', () => {

  it('should send default response values if no error object is set', () => {

    const next = () => {};
    const req = sinonExpressMock.mockReq();
    const res = sinonExpressMock.mockRes();
    const resStatus = res.status;
    const resSend = res.send;

    routeError({}, req, res, next);

    (resStatus.calledOnce).should.be.true();
    (resStatus.calledWith(500)).should.be.true();
    (resSend.calledOnce).should.be.true();
    (resSend.calledWith('Oops something went wrong')).should.be.true();

  });

  it('should call next with an error if the content type is invalid', () => {

    const errorObj = new RouteErrorObject(400, 'Invalid content-type');

    const next = () => {};
    const req = sinonExpressMock.mockReq();
    const res = sinonExpressMock.mockRes();
    const resStatus = res.status;
    const resSend = res.send;

    routeError(errorObj, req, res, next);

    (resStatus.calledOnce).should.be.true();
    (resStatus.calledWith(400)).should.be.true();
    (resSend.calledOnce).should.be.true();
    (resSend.calledWith('Invalid content-type')).should.be.true();

  });

});
