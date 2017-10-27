const server = {
  close(callback){
    callback();
  }
}

module.exports = class MockApp {
  constructor(){
    this.listenCalls = 0;
    this.store = {};
  }

  listen(callback){
    this.listenCalls = this.listenCalls + 1;
    callback();
    return server;
  }

  emit(key){

  }

  get(key){
    return this.store[key];
  }

  set(key, value){
    this.store[key] = value;
  }
};
