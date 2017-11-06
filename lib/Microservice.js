const { promisify } = require('util');
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
    async stop() {

        if (!this.server || !this.server.listening) return Promise.reject(new Error('Microservice not running'));

        const server = this.server;
        // avoid race conditions
        this.server = null;
        return new Promise((resolve, reject) => {
            // does not work with promisify
            server.close((error) => {
                if (error) {
                    // if unable to stop the server, reassign it.
                    this.server = server;
                    reject(error);
                } else {
                    resolve(this);
                }
            });
        });
    }

    /**
     * Start the webserver of the microservice.
     *
     * @returns {Promise.<Microservice>}
     */
    async start() {

        if (this.server && this.server.listening) return this;

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
    async boot(options = {}) {
        const bootOptions = Object.assign({}, this._bootOptions, options);
        return promisify(boot)(this.app, bootOptions).then(() => this);
    }

    /**
     * Boots a microservice instance and starts the webserver.
     *
     * @returns {Promise.<Microservice>}
     */
    static async start(bootOptions = {}) {
        const service = await Microservice.boot(bootOptions);
        return service.start();
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
    static async boot(bootOptions = {}) {
        const app = loopback();
        const service = new Microservice(app, bootOptions);
        return service.boot();
    }
};
