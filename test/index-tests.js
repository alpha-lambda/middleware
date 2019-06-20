'use strict';

const { expect } = require('chai');
const sinon = require('sinon');

const withDrivers = require('../index');

class Driver {}

describe('with-drivers', function() {
  beforeEach(function() {
    this.event = {};
    this.next = sinon.stub().returns();
  });

  it('should add drivers to the context', function() {
    const context = {};
    const mw = withDrivers({
      foo: Driver
    });

    mw(this.event, context, this.next);

    sinon.assert.calledOnce(this.next);
    const [nextEvent, nextContext] = this.next.firstCall.args;

    expect(nextEvent).to.be.null;
    expect(nextContext).to.have.all.keys('drivers');
    expect(nextContext.drivers).to.have.all.keys('foo');
    expect(nextContext.drivers.foo).to.be.an.instanceof(Driver);
  });

  it('should not override drivers that are in the context already', function() {
    const someDriver = { test: true };
    const context = {
      drivers: {
        someDriver
      }
    };

    const mw = withDrivers({
      someDriver: Driver,
      foo: Driver
    });

    mw(this.event, context, this.next);

    sinon.assert.calledOnce(this.next);
    const nextContext = this.next.firstCall.args[1];

    expect(nextContext).to.have.all.keys('drivers');
    expect(nextContext.drivers).to.have.all.keys('someDriver', 'foo');
    expect(nextContext.drivers.someDriver).to.deep.equal(someDriver);
    expect(nextContext.drivers.foo).to.be.an.instanceof(Driver);
  });

  it('should pass correct config to the driver`s constructor', function() {
    const context = {};
    const config = {
      foo: { level: 'info' },
      bar: { level: 'debug' }
    };
    const driverConstr = sinon.stub();
    const mw = withDrivers({
      foo: driverConstr
    }, config);

    mw(this.event, context, this.next);

    sinon.assert.calledWithExactly(driverConstr, config.foo);
  });
});
