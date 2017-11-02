const commonSetupTasks = require('./common');

before(function() {
    this.models = this.service.app.models;
});
