'use strict';

const net = require('net');

class Graphite {
    constructor(host, port) {
        this.socket = net.connect({host, port});
    }
    end() {
        if (this.socket) {
            this.socket.end();
        }
    }
    write(metric, value, timestamp = Date.now()) {
        timestamp = Math.floor(timestamp / 1000);
        this.socket.write(`${metric} ${value} ${timestamp}\n`);
    }
}

module.exports = Graphite;
