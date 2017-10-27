const args = require('yargs').argv;

const Microservice = require('./lib/Microservice');

module.exports = Microservice;

if (require.main === module) {

  const optionsFile = args.options;
  const options = optionsFile ? require(optionsFile) : {};

  options.env = options.env || process.env.NODE_ENV;

  Microservice
    .start(options)
    .catch(err => {
      console.error(err);
      process.exit();
    })
}
