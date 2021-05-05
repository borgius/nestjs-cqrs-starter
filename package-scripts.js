/* eslint-disable @typescript-eslint/no-var-requires */
const { chain } = require('lodash');
const {concurrent, setColors} = require('nps-utils');
const { projects } = require('./nest-cli.json');
setColors(['blue', 'magenta', 'green', 'black', 'cyan', 'red', 'white', 'yellow', 'blue.bold', 'magenta.bold', 'green.bold', 'black.bold', 'cyan.bold', 'red.bold', 'white.bold', 'yellow.bold']);

const apps = chain(projects)
  .map((app, name) => ({...app, name}))
  .filter({type: 'application'})
  .map(app => app.name)
  .drop()
  .value();
const appsParams = (prefix='', params='') => apps.map(app => `${prefix}${app}${params}`);  
console.log(concurrent(['nps start.gateway', ...appsParams('nest start ', ' --debug --watch')]))
//process.exit();


module.exports = {
  scripts: {
    default: 'nps start',
    start: {
      default: 'nps start.debug',
      all: concurrent(['nps start.gateway', ...appsParams('nest start ')]),
      watch: concurrent(['nps start.gateway', ...appsParams('nest start ', ' --watch')]),
      debug: concurrent(['nps start.gateway', ...appsParams('nest start ', ' --debug --watch')]),
      gateway: 'wait-on tcp:4001 tcp:4002 && nest start gateway',
    },
    test: {
      default: {
        script: "jest", // nps test
        description: "Run tests with jest"
      },
    },
  }
};
