const appRootDir = './app';
const appConfigRootDir = `${appRootDir}/config`;
const dsRootDir = appConfigRootDir;
const modelsRootDir = appConfigRootDir;
const middlewareRootDir = appConfigRootDir;
const componentRootDir = appConfigRootDir;
const bootDirs = [`${appRootDir}/boot`];

module.exports = {
    appRootDir,
    appConfigRootDir,
    bootDirs,
    componentRootDir,
    middlewareRootDir,
    modelsRootDir,
    dsRootDir,
    env: 'dev',
};
