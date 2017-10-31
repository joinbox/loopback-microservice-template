const Task = require('../../lib/Task');

module.exports = class UpdateModels extends Task {

    constructor() {
        super('Automigrate-Models', '1.0.0');
    }

    run(dependencies, result) {
        const datasources = dependencies.service.app.datasources;
        const sources = this.sourcesToUniqueArray(datasources);

        return sources.reduce((pending, datasource) => {
            const current = new Promise((resolve, reject) => {
                datasource.autoupdate((err) => {
                    if (err) return reject(err);
                    resolve();
                });
            });
            return pending.then(() => current);
        }, Promise.resolve());
    }
};
