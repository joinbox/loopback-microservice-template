/**
 * Do common setup tasks in this file, e.g. adding chai helpers.
 */
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const testLib = require('../lib');
const Microservice = require('../../../lib/Microservice');

chai.use(chaiAsPromised);

before(function(){
  return Microservice
    .boot({ env: 'test' })
    .then((service) => {
      this.service = service;
    });
});