const args = require('yargs').argv;

const Microservice = require('@joinbox/loopback-microservice');

module.exports = Microservice;

function loadBootOptions(path = './config/defaultBootOptions') {
    try {
        return Object.assign({}, require(path));
    } catch (err) {
        const message = `Unable to load boot options from "${path}" (${err.message})`;
        throw new Microservice.MicroserviceError(message);
    }
}

if (require.main === module) {
    // optional argument to pass in the path to module exporting boot options as an object
    // e.g. `npm start -- --options=../bootOpts`
    const optionsFile = args.options;
    const boot = loadBootOptions(optionsFile);
    const options = { boot };

    options.boot.env = process.env.NODE_ENV || boot.env;

    Microservice
        .start(options)
        .catch((error) => {
            // safe way to exit the process https://nodejs.org/api/process.html#process_process_exit_code
            console.error(error);
            process.exitCode = 1;
        });
}
