'use strict';

const net = require('net');

class Graphite {
    constructor(host, port) {
        this.options = {host, port};
        this.socket = null;
    }
    open() {
        if (!this.socket) {
            this.socket = net.connect(this.options);
            this.socket.on('close', () => {
                this.close();
            });
        }
    }
    close() {
        if (this.socket) {
            this.socket.destroy();
            this.socket = null;
        }
    }
    write(metric, value, timestamp = Date.now()) {
        timestamp = Math.floor(timestamp / 1000);
        this.open();
        this.socket.write(`${metric} ${value} ${timestamp}\n`);
    }
}

module.exports = Graphite;
