# Angular SDK

We use a [component](https://github.com/joinbox/loopback-component-angular-sdk) to generate the [Loopback AngularSDKs](https://loopback.io/doc/en/lb3/AngularJS-JavaScript-SDK.html) on the fly and load it into our frontend applications.

## Custom Remote Methods

The behavior of remote methods in Angular is barely documented. Usually one has do differentiate between method parameters (passed using the url), the body that is sent and the options object.

```Json
"methods": {
  "translateProperties": {
     "accepts": [
            {
                "arg": "sourceContent",
                "type": "object",
                "http": {
                    "source": "body",
                },
            },
            {
                "arg": "from",
                "type": "string",
                "required": true,
                "http": {
                    "source": "path",
                },
            },
            {
                "arg": "to",
                "type": "string",
                "required": true,
                "http": {
                    "source": "path",
                },
            },
            {
                "arg": "options",
                "type": "object",
                "http": "optionsFromRequest",
            },
        ]
     }
  }
}
```

Basically a remote method attached to an angular resource accepts four parameters:

  1. The parameters as an object hash e.g. `{ from: 'en-gb', to: 'de-ch' }`
  2. The body to be sent e.g. `{ first: 'Hello', second: 'World' }`
  3. A success callback
  4. An error callback

The remote methods furthermore return an object containing a `$promise` property which can be used to omit the the callbacks. Since we rely on `async/await`, we omit the cases including callbacks in this documentation.

### Invocation

Ingoring cases having a callback, there are three remaining cases of remote method invocations on resources:

```Javascript
const invocationOnlyWithBody = await myService_MyModel.translateObject(body).$promise;
const invocationOnlyWithParams = await myService_MyModel.translateObject(params).$promise;
const invocationWithBodyAndParams = await myService_MyModel.translateObject(params, body).$promise;
```

### Instance Methods

The previous sections describe the invocation of a static remote method. Instance methods work the same way except they need the id of the current instance. The id will be extracted from the instance and auto injected into the params by the SDK on invocation.
