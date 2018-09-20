# Authentication Authorization and Permissions

## Dynamic-Role-Resolver

One can create [dynamic-role-resolvers](https://loopback.io/doc/en/lb3/Defining-and-using-roles.html#dynamic-roles)

### Custom Resolver

  - In general, a resolver will only allow you to tell the application if someone belongs to a role or not. While this seems obvious, it is not sufficient to provide advanced filtering or row restrictions in lists (find).
  - Custom resolvers will allow you to restrict access to *single* entities in a dynamic fashion.

### The `$owner` resolver

Requires your model to have a relation to the user which owns the model instance and only works
for accesses via methods specifying the corresponding id.

> *Note:* The example is bullshit since it does not clarify if the endpoints need to carry the
id of the user or the model instance itself. In general it seems that these resolvers only work
for remote methods pointing to internal methods like `findById`.

## Further Readings

  - https://loopback.io/doc/en/lb3/Defining-and-using-roles.html#dynamic-roles
  - https://loopback.io/doc/en/lb3/Authentication-authorization-and-permissions.html