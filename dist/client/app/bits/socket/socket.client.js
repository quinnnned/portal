var io = require('socket.io/socket.io.js');
var Socket = (function () {
    function Socket() {
        var socket = io.connect('https://portal-javascriptsandbox.c9.io/', {
            transports: ['websocket', 'polling']
        });
        socket.on('message', function (message) {
            console.log(message);
            socket.emit('message', { payload: 'client->server' });
        });
        [
            'connect',
            'reconnect',
            'reconnecting',
            'reconnect_attempt',
            'connect_error'
        ].forEach(function (event) {
            socket.on(event, function () { console.log('socket:' + event); });
        });
    }
    Socket.prototype.send = function () {
    };
    return Socket;
})();
exports.Socket = Socket;
