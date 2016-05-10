'use strict';

var fs = require('fs');
var path = require('path');
var Graphite = require('./graphite');

var config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config.json')));

var graphite = new Graphite(config.carbon.host, config.carbon.port);

function schedule(fn, interval) {
    if (false !== fn()) {
        setTimeout(function () {
            schedule(fn, interval);
        }, interval);
    }
}

config.devices.forEach(function (device) {
   var deviceFn = require('./devices/' + device.type);
   var file = path.join(config.path, device.id, 'w1_slave');
   schedule(function() {
       return deviceFn(file, device, graphite);
   }, device.interval * 1000);
});

