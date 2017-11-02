const superagent = require('superagent');
const url = require('url');

module.exports = class ApiClient {
    constructor(baseUrl) {
        this.base = baseUrl;
    }

    get(path) {
        return superagent.get(this.createEndpoint(path));
    }

    post(path, data) {
        return superagent.post(this.createEndpoint(path), data);
    }

    put(path, data) {
        return superagent.put(this.createEndpoint(path), data);
    }

    patch(path, data) {
        return superagent.patch(this.createEndpoint(path), data);
    }

    delete(path, data) {
        return superagent.delete(this.createEndpoint(path), data);
    }

    createEndpoint(path) {
        return `${this.base}${path}`;
    }

    static fromURL(urlOptions) {
        const urlTemplate = Object.assign({}, urlOptions);
        urlTemplate.protocol = urlTemplate.protocol || 'http';

        return new ApiClient(url.format(urlTemplate));
    }
};
