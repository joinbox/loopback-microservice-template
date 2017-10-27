// create an integration setup
const ApiClient = require('../lib/ApiClient');
const unitSetup = require('./unit');

before(function() {
    return this.service
        .start()
        .then((service) => {

            const hostname = service.app.get('host');
            const port = service.app.get('port');

            this.apiClient = ApiClient.fromURL({ hostname, port });
        });
});

after(function() {
    return this.service.stop();
});
