# Microservice

The starting process optionally accepts boot options which are directly passed to loopback's 
[`boot` function](https://apidocs.strongloop.com/loopback-boot/) . To pass in boot options to the starting script, 
specify the path to your module exporting the corresponding options (it is loaded using require) via the `--options` 
parameter.

**boot_options.js:**
```Javascript
module.exports = {
    env: 'fancy'
};
```

```Bash
# using npm
npm start [-- --options=.boot_options]
# which is an alias for
node . [-- options=.boot_options]
```

