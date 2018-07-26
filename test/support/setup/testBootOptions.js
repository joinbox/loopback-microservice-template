const defaultBootOptions = require('../../../app/config/defaultBootOptions');

// Set the testing environment to testing to avoid collisions on a test server
const env = process.env.NODE_ENV || 'testing';
const testBootOptions = Object.assign({}, defaultBootOptions, { env });

module.exports = testBootOptions;