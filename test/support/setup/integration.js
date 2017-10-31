// create an integration setup
const ApiClient = require('../lib/ApiClient');
const TaskQueue = require('../../../lib/TaskQueue');

const Automigration = require('../../../app/tasks/UpdateModels');
const MigrationQueue = require('../../../lib/MigrationQueue');

const unitSetup = require('./unit');

before(async function() {
    const service = await this.service.start();

    const hostname = service.app.get('host');
    const port = service.app.get('port');

    this.apiClient = ApiClient.fromURL({ hostname, port });
});

before(function() {
    const dependencies = {
        service: this.service,
    };
    const tasks = [new Automigration()];
    const queue = MigrationQueue.fromTasks('Test migration', '1.0.0', tasks);

    return queue.run(dependencies);
});

// make sure the service runs, this will not start a new instance
beforeEach(function() {
    return this.service.start();
});

after(function() {
    return this.service.stop();
});
