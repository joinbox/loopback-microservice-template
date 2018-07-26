/**
 * Default configuration for the template setup.
 *
 * All the paths are configured in a way, that local components and models can be resolved
 * relative to the configuration directory.
 */
const path = require('path');

const appConfigRootDir = __dirname;
const appRootDir = path.resolve(appConfigRootDir, '..');
// Folder for datasources.{env}.json
const dsRootDir = appConfigRootDir;
// Folder for model-config.{env}.json
const modelsRootDir = appConfigRootDir;
// Folder for middleware.{env}.json
const middlewareRootDir = appConfigRootDir;
// Folder for component-config.{env}.json
const componentRootDir = appConfigRootDir;
// Folder to look for mixins (all these mixins are auto loaded
const mixinDirs = [`${appRootDir}/mixins`];
// Folders to look for boot directories
const bootDirs = [`${appRootDir}/boot`];

module.exports = {
    appRootDir,
    appConfigRootDir,
    bootDirs,
    componentRootDir,
    dsRootDir,
    middlewareRootDir,
    mixinDirs,
    modelsRootDir,

    env: 'dev',
};
