# Models

Describe non-obvious properties and internal workings of loopback models.

## Model Definitions & Configurations

Model definitions are stored within the configured source folder for models, in our case 
`./app/models/` (`./server/`) by default. To create a new model one has to create a `.json` file 
(preferably having the same name as the model) in the `./app/models` folder. 
To customize your model programmatically, you can create a `.js` file with the same name, 
exporting a customization function (sort of a constructor, see documentation linked below for more 
information).

### Adding configuration to a model, its properties, its relations and overriding them per environment.

Loopback allows adding custom settings to model and overriding them (without any further restrictions):

#### Adding configuration to a model

Add your configuration to your model definition by adding whatever you want to the corresponding `.json` file:

```Json
{
   "name": "Example",
   "myConfig": {
      "myConfigValue": true
   }
}
```

These settings are available on the model
```Javascript
  const exampleModel = app.models.Example;d
  // true
  const { myConfigValue } = exampleModel.definition.settings.myConfig;
```

#### Adding configuration to a model's property

Similar to the model's definition you can add configuration to a property of a model:
```Json
{
   "name": "Example",
   "properties": {
      "myProperty": {
         "type": "string",
         "myPropertyConfig": {
            "myPropertyConfigValue": true
         }
      }
   }
}
```
These settings are available on the model
```Javascript
  const exampleModel = app.models.Example;
  // true
  const { myPropertyConfigValue } = exampleModel.definition.properties.myPropertyConfig;
```

#### Adding configuration to a model's relation

Similar to the model's property you can add configuration to a relation of a model.

> **Note:** While the model definition provides an accessor for properties as well as relations, the later do usually seem to be empty (i guess it depends on the attached datasource). Therefore you might want to access their definition as described below.

```Json
{
   "name": "Example",
   "relations": {
      "myRelation": {
         "type": "belongsTo",
         "model": "AnotherModel",
         "myRelationConfig": {
            "myRelationConfigValue": true
         }
      }
   }
}
```
These settings are available on the model
```Javascript
  const exampleModel = app.models.Example;
  const relationSettings = exampleModel.definition.settings.relations;
  // true
  const { myPropertyConfigValue } = relationSettings.myRelation.myRelationConfig;
```
#### Overriding the model configuration using the `model-config.json`

One can override the settings given in the model definition in the environment specific `model-config.json`. This can be used to override settings of a model for different environments and datasources.

```Json
{
  "Example": {
    "dataSource": "memory",
    "options": {
      "myConfig": {
        "myConfigValue": false,
        "myAdditionalConfigValue": "yay"
      }
    }
  }
}
```

This will extend the basic settings of the model:

```Javascript
  const exampleModel = app.models.Example;
  /**
   * {
   *   myConfigValue: false,
   *   myAdditionalConfigValue: "yay"
   * }
   */
  const { myConfig } = exampleModel.definition.settings;
```

### Inheritance (Base Model)

Loopback allows you to define a base-model using the `base` property in the according definition
(_e.g._ `"base": "PersistedModel"`). It is also possible to inherit from custom models. It is
important to know that loopback will only propagate the definition itself (the json file) and will
*NOT* invoke the constructor!


## Readings

- [Official Documentation](https://loopback.io/doc/en/lb3/Model-definition-JSON-file.html)