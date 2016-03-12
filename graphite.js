'use strict';

var net = require('net');

module.exports = Graphite;

function Graphite(host, port) {
    this.socket = net.connect({host: host, port: port});
}

Graphite.prototype.end = function() {
    if (this.socket) {
        this.socket.end();
    }
};

Graphite.prototype.write = function (metric, value, timestamp) {
    timestamp = timestamp || Date.now();
    timestamp = Math.floor(timestamp / 1000);

    this.socket.write(metric + ' ' + value + ' ' + timestamp + '\n');
};

