const Task = require('./Task');

module.exports = class MigrationTask extends Task {

    constructor(task, rerun = false) {
        const name = `Migration:${task.name}`;
        super(name, task.version);
        this.task = task;
        this.rerun = rerun;
    }

    async run(dependencies) {

        await this.ensureDependencies(dependencies, ['service']);

        const migrationModel = dependencies.service.app.models.Migration;
        const migrationRanBefore = await this.migrationAlreadyPerformed(migrationModel);

        if (migrationRanBefore && this.rerun === false) return Promise.resolve();

        const migration = await this.createMigration(migrationModel);

        try {
            const result = await this.runTask(dependencies);
            return this.finalizeMigration(migration, result);
        } catch (err) {
            return this.finalizeMigration(migration, null, err);
        }
    }

    async finalizeMigration(migration, result, err) {
        if (err) {
            migration.failed = new Date();
            migration.data = JSON.stringify(err);
        } else {
            migration.succeeded = new Date();
            migration.data = JSON.stringify(result);
        }
        return migration.save();
    }

    async migrationAlreadyPerformed(migrationModel) {
        const params = {
            filter: {
                where: {
                    identifier: this.name,
                    suceeded: {
                        neq: null,
                    },
                },
            },
        };
        const result = migrationModel.findOne(params);
        return !!result;
    }

    createMigration(migrationModel) {
        const migrationData = {
            started: new Date(),
            identifier: this.name,
        };
        return migrationModel.create(migrationData);
    }

    revert() {
        return this.task.revert();
    }

    async runTask(dependencies) {
        return this.task.run(dependencies);
    }

};
