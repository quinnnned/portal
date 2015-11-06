var express = require('express');
var Server = require('socket.io');
var path = require('path');
var invokrTest_server_1 = require('./bits/invokrTest/invokrTest.server');
var staticFolder = path.resolve(__dirname + '../../../client/');
var app = express();
app.use(express.static(staticFolder));
var server = app.listen(process.env.PORT, function () {
    var test = new invokrTest_server_1.InvokrTest();
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server listening at http://%s:%s', host, port);
});
var io = Server(server, { transports: ['websocket', 'polling'] });
io.on('connection', function (socket) {
    socket.emit('message', { payload: 'server->client' });
    socket.on('message', console.log);
});
