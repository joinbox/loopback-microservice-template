/**
 * Middleware that adds a logger instance.
 *
 * Currently this is only a tryout.
 */
module.exports = function(app, options) {

    const logLevel = options.logLevel || 'development';
    const logEnabled = logLevel === 'development';
    const logger = {
        passToConsole(operation, args) {
            if (logEnabled) {
                console[operation].call(console, ...args);
            }
        },
        log(...args) {
            logger.passToConsole('log', args);
        },
        info(...args) {
            logger.passToConsole('info', args);
        },
        warn(...args) {
            logger.passToConsole('warn', args);
        },
        error(...args) {
            logger.passToConsole('error', args);
        },
    };

    app.set('microservice-logger', logger);
};
