# Datasources

## Remote connectors

Loopback provides connectors which enable your application to consume data from remote services
using different protocols (such as `loopback-connector-remote`, `loopback-connector-rest` and
`loopback-connector-soap`).

### Remote vs. Rest

At first sight the remote connector simply seems to be a wrapper for the underlying protocol (REST
by default). But during the evaluation of the connectors, it seemed to be the case, that the remote
connector has some important characteristics:

   - It seems to optimize the queries to the remote service.
   - It does not emit the events the other datasources emit (_.e.g._ `before execute`)
   - It is fully based on strong-remoting

#### Hooks

Connectors usually provide [connector hooks](https://loopback.io/doc/en/lb3/Connector-hooks.html).
Since the remote connector uses strong-remoting we can use
[its own event-hooks](https://github.com/strongloop/strong-remoting) (which will couple
your code to the connector and remove the possibility to exchange the data source freely without
according checks in your code):

```Javascript
// Rest
connector.observe('before execute', (ctx, next) => {
    // do your thing
});
// Remote
connector.remotes.before('**', (ctx, next, method)=> {
    // do your thing
});
```

#### Authentication

Authentication in the remote-connector is badly documented.

One can set a global (application) token:

```Javascript
// bearer
connector.remotes.auth = {
    bearer: token.toString('base64'),
    sendImmediately: true
};
// loopback token
connector.remotes.auth = {
    // set the token object (not only the id)
    accessToken: token
};
// username and password
connector.remotes.auth = {
    username: name,
    password: pwd,
};

```

Setting a token per request (e.g. a user token):

```Javascript
connector.remotes.before('**', (ctx, next, method) => {
    // set the values analogous to the above example on the req
    ctx.req.auth = {};
    // the access token has to be set via headers
    ctx.req.headers.Authorization = token.id;
});
```
