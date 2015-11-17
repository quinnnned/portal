/// <reference path="../../typings/node/node.d.ts" />

import * as express from 'express';

import * as path from 'path';
import {Portal} from './bits/framework/portal.server';
import {MockDatabase} from './bits/persister/mock.db.server';

let staticFolder = path.resolve(__dirname + '../../../client/');

let app = express();
app.use(express.static(staticFolder));

let server = app.listen(process.env.PORT, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Server listening at http://%s:%s', host, port);
});

new Portal(server, new MockDatabase());
