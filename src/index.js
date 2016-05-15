'use strict';

const fs = require('fs');
const path = require('path');
const join = path.join;

function parseJSON(filename) {
    return JSON.parse(fs.readFileSync(filename));
}

const program = require('commander');
program
    .version(
        parseJSON(join(__dirname, '..', 'package.json')).version
    )
    .option('-c, --config [filename]', 'Path to the config file')
    .parse(process.argv);

if (!program.config) {
    program.help();
    process.exit(1);
}

const config = parseJSON(program.config);

const Graphite = require('./graphite');
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
    const file = join(config.path, device.id, 'w1_slave');
    schedule(
        () => deviceFn(file, device, graphite),
        device.interval * 1000
    );
});

