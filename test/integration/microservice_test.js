const { expect } = require('chai');

describe('The Microservice', function() {
    // test is commented out due to
    it('can be started, returning a promise which resolves the service ' +
    '(returns the running instance if already started)', function() {

        return this.service.start((service) => {
            expect(this.service).to.equal(service);
        });
    });

    it('can be stopped, returning a promise which resolves the service', function() {

        return this.service.stop((service) => {
            expect(this.service).to.equal(service);
        });
    });

    it('is properly booted and exposes a health endpoint', function() {

        return this.apiClient
            .get('/')
            .then((response) => {
                expect(response).to.have.property('status', 200);
            });
    });

});
