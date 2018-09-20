# Mixins

## General

### Source Code

Loopback Mixins are defined as a function within your mixins folder (`my-mixin.js`):

```Javascript
  module.exports = function(model, options){
    // do your magic
  }
```

The Loopback core is heavily based on mixins. A typical use case for mixins is inheritance (within
an application as well as between different applications and packages). Loopback models do not
support proper inheritance: the definition file is respected but the constructor function is not
called. So to inherit methods, a model should define its methods via mixin.

### Loading

To make the Mixins available to the models one has to either add the source dir (or the files) to the `_meta` section of the `model-config.json`:

```JSON
{
  "_meta": {
    "mixins": [
      "loopback/server/mixins",
      "../mixindir/relative/to/the/appRootDir",
      "@joinbox/thingy/mixins/whuat"
    ]
  }
}
```

### Configuration

To hook in your mixin to a model, you can add it to the model's mixin section of the definition file (`your-model.json`.

> **Loopback will convert the file name of your mixin to Pascal Case and use it as the identifier to reference it.**

```JSON
{
    "name": "YourModel",
    "mixins": {
       "MyMixin": {
         "optionValue": true
       }
    }
}
```

> **Note:** You don't have to specify options, you can just set the value of "MyMixin" to true.

## Template

In our template, it is not necessary to set the mixin directory, it is added in the default boot
options.

