const { expect } = require('chai');
const Microservice = require('../../lib/Microservice');
const MockApp = require('../support/lib/MockApp');

describe('The Microservice Class', function(){

  it('can be instantiated with an app instance which is exposed', function(){
    const app = {};
    const service = new Microservice(app);

    expect(service).to.have.property('app', app);
  });

  it('accepts boot options', function(){
    const app = {};
    const bootOptions = {
      appRootDir: './test',
      appConfigRootDir: './test/config',
      componentRootDir: './test/config',
      dsRootDir: '/app/config',
      env: 'test',
      middlewareRootDir: '/test/config',
      modelsRootDir: '/test/config'
    };
    const service = new Microservice(app, bootOptions);

    expect(service._bootOptions).to.deep.equal(bootOptions);
  });

  it('accepts partial boot options and assigns defaults', function(){
    const app = {};
    const bootOptions = {
      appRootDir: './test',
    };
    const service = new Microservice(app, bootOptions);

    expect(service._bootOptions).to.have.property('env', 'dev');
  });

});
