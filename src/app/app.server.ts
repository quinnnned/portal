import * as express from 'express';
import * as Server from 'socket.io';
import * as path from 'path';
import {InvokrTest} from './bits/invokrTest/invokrTest.server';

let staticFolder = path.resolve(__dirname + '../../../client/');

let app = express();
app.use(express.static(staticFolder));

let server = app.listen(process.env.PORT, () => {
  
  let test = new InvokrTest();
  var host = server.address().address;
  var port = server.address().port;
  console.log('Server listening at http://%s:%s', host, port);
});

let io = Server(server, {transports:['websocket', 'polling']});

io.on('connection', (socket) => {
    socket.emit('message', { payload: 'server->client' });
    socket.on('message', console.log);
});
