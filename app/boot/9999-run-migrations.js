module.exports = async function(app, next) {
    const migration = app.get('loopback-component-jb-migration');
    const logger = app.get('microservice-logger');
    try {
        await migration.run({ app, logger });
    } catch (err) {
        return next(err);
    }
    return next();
};
