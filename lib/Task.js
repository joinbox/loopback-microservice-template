module.exports = class Task {

    constructor(name, version) {
        this.name = name;
        this.version = version;
    }

    run(dependencies, previous) {
        const err = new Error('Task:#run() not implemented');
        return Promise.reject(err);
    }

    revert(dependencies) {
        const err = new Error('Task:#revert() not implemented');
        return Promise.reject(err);
    }

    ensureDependencies(container, dependencyNames){
        return new Promise((resolve, reject) => {
            for(const name of dependencyNames) {
                if(!container.hasOwnProperty(name)){
                    const err = new Error(`Unmet depencency ${name} in dependency container`);
                    return reject(err);
                }
            }
            resolve(container);
        });
    }

    sourcesToUniqueArray(datasources) {
        const uniqueSources = Object
            .keys(datasources)
            .reduce((map, key) => {
                const source = datasources[key];
                if (!map.hasOwnProperty(source.name)) {
                    map[source.name] = source;
                }
                return map;
            }, {});

        return Object
            .keys(uniqueSources)
            .map(key => uniqueSources[key]);
    }

};
