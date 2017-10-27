const { expect } = require('chai');

describe('The Microservice', () => {

    it('is properly booted and exposes a health endpoint', function() {
        return this.apiClient
            .get('/')
            .then((response) => {
                expect(response).to.have.property('status', 200);
            });
    });

});
