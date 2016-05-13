'use strict';

const fs = require('fs');
const path = require('path');
const Graphite = require('./graphite');

const config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config.json')));

const graphite = new Graphite(config.carbon.host, config.carbon.port);

function schedule(fn, interval) {
    if (false !== fn()) {
        setTimeout(
            () => schedule(fn, interval),
            interval
         );
    }
}

config.devices.forEach(device => {
   const deviceFn = require(`./devices/${device.type}`);
   const file = path.join(config.path, device.id, 'w1_slave');
   schedule(
      () => deviceFn(file, device, graphite),
      device.interval * 1000
   );
});

