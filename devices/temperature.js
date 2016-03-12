'use strict';

var fs = require('fs');

module.exports = function (file, config, graphite) {
    var debug = require('../debug')('temperature/' + config.id);
    try {
        var resp = fs.readFileSync(file, 'utf8');
        var lines = resp.split('\n');
        if (lines.length === 3 && lines[0].split(' ').pop() === 'YES') {
            var pos = lines[1].indexOf('t=');
            if (pos !== -1) {
                var temp = lines[1].slice(pos + 2) / 1000;
                debug.log(temp);
                graphite.write(config.name, temp);
            } else {
                debug.warn('No temperature found\n' + resp);
            }
        } else {
            debug.warn('Checksum error\n' + resp);
        }
    } catch (e) {
        debug.error(e);
    }
};
