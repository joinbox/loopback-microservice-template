const loopback = require('loopback');
const boot = require('loopback-boot');


/**
 * Basic Microservice class wrapping a loopback application.
 *
 * @type {module.Microservice}
 */

module.exports = class Microservice {

    constructor(app, bootOptions = {}) {
        const defaultAppDir = './app';
        const defaultConfigDir = `${defaultAppDir}/config`;

        this.app = app;
        this.server = null;
        this._bootOptions = Object.assign({
            appRootDir: defaultAppDir,
            appConfigRootDir: defaultConfigDir,
            componentRootDir: defaultConfigDir,
            dsRootDir: defaultConfigDir,
            env: 'dev',
            middlewareRootDir: defaultConfigDir,
            modelsRootDir: defaultConfigDir,
        }, bootOptions);
    }

    /**
     * Stop the webserver of the microservice.
     *
     * @returns {Promise.<Microservice>}
     */
    stop() {

        if (!this.server || !this.server.listening) return Promise.reject(new Error('Microservice not started yet'));

        const server = this.server;
        // avoid race conditions
        this.server = null;

        return new Promise((resolve, reject) => {
            server.close((err) => {
                if (err) {
                    // if unable to stop the server, reassign it.
                    this.server = server;
                    return reject(err);
                }
                resolve();
            });
        });

    }

    /**
     * Start the webserver of the microservice.
     *
     * @returns {Promise.<Microservice>}
     */
    start() {

        if (this.server && this.server.listening) return Promise.resolve(this);

        return new Promise((resolve, reject) => {
            // @note: this method might throw an exception, we should not catch it,
            //        due to possible issues in the testing
            this.server = this.app.listen(() => {

                this.app.emit('started');

                const baseUrl = this.app.get('url').replace(/\/$/, '');
                const logger = this.app.get('logger');

                logger.info('Web server listening at: %s', baseUrl);

                if (this.app.get('loopback-component-explorer')) {
                    const explorerPath = this.app.get('loopback-component-explorer').mountPath;
                    logger.info('Browse your REST API at %s%s', baseUrl, explorerPath);
                }

                resolve(this);
            });
        });

    }

    /**
     * Boots the application.
     *
     * More information on the options can be found here https://apidocs.strongloop.com/loopback-boot/.
     *
     * @todo: Do we need to protect the app from being booted multiple times?
     *
     * @see Microservice
     *
     * @param options
     * @returns {Promise.<Microservice>}
     */
    boot(options = {}) {

        const bootOptions = Object.assign({}, this._bootOptions, options);

        return new Promise((resolve, reject) => {
            boot(this.app, bootOptions, (err) => {
                if (err) return reject(err);
                resolve(this);
            });
        });

    }

    /**
     * Boots a microservice instance and starts the webserver.
     *
     * @returns {Promise.<Microservice>}
     */
    static start(bootOptions = {}) {
        return Microservice
            .boot(bootOptions)
            .then(service => service.start());

    }

    /**
     * Creates a microservice instance and boots the corresponding loopback application
     * without listening to an interface.
     *
     * The options argument is optional and is bound to the microservice instance
     * (so every boot process would use the given options).
     *
     * @see the boot method on the class
     *
     * @param options
     * @returns {Promise.<Microservice>}
     */
    static boot(bootOptions = {}) {
        const app = loopback();
        const service = new Microservice(app, bootOptions);
        return service.boot();
    }
};
