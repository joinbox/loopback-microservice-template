/**
 * Do common setup tasks in this file, e.g. adding chai helpers.
 */
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const Microservice = require('@joinbox/loopback-microservice');

const boot = require('./testBootOptions');

const testLib = require('../lib');

chai.use(chaiAsPromised);

before(async function() {
    this.service = await Microservice.boot({ boot });
});
