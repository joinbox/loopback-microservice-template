/**
 * Middleware that adds a logger instance.
 *
 * Currently this is only a tryout.
 */
module.exports = function(app, options){

  const logLevel = options.logLevel || 'development';
  const logEnabled = logLevel === 'development';

  app.set('logger', {
    log(){
      logEnabled && console.log.apply(console, arguments);
    },
    info(){
      logEnabled && console.info.apply(console, arguments);
    },
    warn(){
      logEnabled && console.warn.apply(console, arguments);
    },
    error(){
      logEnabled && console.error.apply(console, arguments);
    }
  });
}