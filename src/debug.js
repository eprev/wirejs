module.exports = Debug;

function Debug(name) {
    if (this instanceof Debug) {
        this.name = name;
    } else {
        return new Debug(name);
    }
}

function pad(val, len, ch) {
    val = String(val);
    len = len || 2;
    ch = ch || '0';
    while (val.length < len) {
        val = ch + val;
    }
    return val;
}

Debug.prototype.write = function (type, msg) {
    var time = new Date();
    var prefix = (
            time.getFullYear() + '-' + pad(time.getMonth() + 1) + '-' + pad(time.getDate()) + ' ' +
            pad(time.getHours()) + ':' + pad(time.getMinutes()) + ':' + pad(time.getSeconds())
        ) + ' ' + this.name + ': ';
    var padding = pad('', prefix.length, ' ');
    console[type](
        (prefix + msg).replace(/\n/g, '\n' + padding)
    );
};

Debug.prototype.log = function () {
    this.write('log', Array.prototype.slice.call(arguments).join(' '));
};

Debug.prototype.warn = function () {
    this.write('warn', Array.prototype.slice.call(arguments).join(' '));
};

Debug.prototype.error = function () {
    this.write('error', Array.prototype.slice.call(arguments).join(' '));
};
