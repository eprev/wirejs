'use strict';

function pad(val, len = 2, ch = '0') {
    val = String(val);
    while (val.length < len) {
        val = ch + val;
    }
    return val;
}

class Debug {
    constructor(name) {
        this.name = name;
    }
    write(type, msg) {
        const time = new Date();
        const prefix = (
                time.getFullYear()   + '-' + pad(time.getMonth() + 1) + '-' + pad(time.getDate()) + ' ' +
                pad(time.getHours()) + ':' + pad(time.getMinutes())   + ':' + pad(time.getSeconds())
            ) + ' ' + this.name + ': ';
        const padding = pad('', prefix.length, ' ');
        console[type](
            (prefix + msg).replace(/\n/g, '\n' + padding)
        );
    }
    log(...args) {
        this.write('log', args.join(' '));
    }
    warn(...args) {
        this.write('warn', args.join(' '));
    }
    error(...args) {
        this.write('error', args.join(' '));
    }
}

module.exports = name => new Debug(name);
