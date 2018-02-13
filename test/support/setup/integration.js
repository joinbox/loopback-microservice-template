// create an integration setup
const unitSetup = require('./unit');

before(function() {
    return this.service.start();
});

// make sure the service runs, this will not start a new instance
beforeEach(function() {
    return this.service.start();
});

after(function() {
    return this.service.stop();
});
