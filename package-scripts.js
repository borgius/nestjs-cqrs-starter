/* eslint-disable @typescript-eslint/no-var-requires */
const {concurrent, setColors} = require('nps-utils');
setColors(['blue', 'magenta', 'green', 'black', 'cyan', 'red', 'white', 'yellow', 'blue.bold', 'magenta.bold', 'green.bold', 'black.bold', 'cyan.bold', 'red.bold', 'white.bold', 'yellow.bold']);


module.exports = {
  scripts: {
    default: 'nps start.all',
    start: {
      gateway: 'wait-on tcp:4001 tcp:4002 && nest start gateway --debug --watch',
      serviceUser: 'nest start service-user --debug --watch',
      serviceAccount: 'nest start service-account --debug --watch',
      all: concurrent.nps('start.gateway', 'start.serviceUser', 'start.serviceAccount') 
    },
    test: {
      default: {
        script: "jest", // nps test
        description: "Run tests with jest"
      },
    },
  }
};
