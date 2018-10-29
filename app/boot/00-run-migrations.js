/**
 * Run your migrations here.
 *
 * @param app
 * @return {Promise<*>}
 */
module.exports = async function(app) {
    const migration = app.get('migration');

    const {
        MigrationQueue,
        MigrationTask,
        tasks,
    } = migration;
    const { CreateMigrationTable } = tasks.postgres;

    const plainTasks = [
        new CreateMigrationTable(),
    ];
    const migrationTasks = plainTasks.map(task => new MigrationTask(task));
    const queue = new MigrationQueue(migrationTasks, {
        transactionConfig: {},
    });
    return queue.run({ app });
};
