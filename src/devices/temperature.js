'use strict';

const fs = require('fs');

module.exports = (file, config, graphite) => {
    const debug = require('../debug')(`temperature/${config.id}`);
    try {
        const resp = fs.readFileSync(file, 'utf8');
        const lines = resp.split('\n');
        if (lines.length === 3 && lines[0].split(' ').pop() === 'YES') {
            const pos = lines[1].indexOf('t=');
            if (pos !== -1) {
                const temp = lines[1].slice(pos + 2) / 1000;
                debug.log(temp);
                graphite.write(config.name, temp);
            } else {
                debug.warn(`No temperature found\n${resp}`);
            }
        } else {
            debug.warn(`Checksum error\n${resp}`);
        }
    } catch (e) {
        debug.error(e);
    }
};
