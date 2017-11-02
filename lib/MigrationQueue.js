const TaskQueue = require('./TaskQueue');
const MigrationTask = require('./MigrationTask');

module.exports = class MigrationQueue extends TaskQueue {

    async run(dependencies) {
        const { service } = await this.ensureDependencies(dependencies, ['service']);
        const dataSources = service.app.datasources;
        // this fails for postgres https://github.com/strongloop/loopback-datasource-juggler/issues/1494
        // return dataSources.db.transaction(() => super.run(dependencies));
        return super.run(dependencies);
    }

    static fromTasks(name, version, tasks) {
        const migrationTasks = tasks.map(task => new MigrationTask(task));
        return new MigrationQueue(name, version, migrationTasks);
    }
};
