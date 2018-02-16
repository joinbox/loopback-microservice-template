const args = require('yargs').argv;

const Microservice = require('@joinbox/loopback-microservice');

module.exports = Microservice;

function loadBootOptions(path = './app/config/defaultBootOptions') {
    if (!path) return {};
    try {
        return Object.assign({}, require(path));
    } catch (err) {
        const message = `Unable to load boot options from "${path}" (${err.message})`;
        throw new Error(message);
    }
}

if (require.main === module) {
    // optional argument to pass in the path to module exporting boot options as an object
    // e.g. `npm start -- --options=../bootOpts`
    const optionsFile = args.options;
    const options = loadBootOptions(optionsFile);

    options.env = options.env || process.env.NODE_ENV;

    Microservice
        .start(options)
        .catch((error) => {
            // safe way to exit the process https://nodejs.org/api/process.html#process_process_exit_code
            console.error(error);
            process.exitCode = 1;
        });
}
