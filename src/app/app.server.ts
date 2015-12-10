/// <reference path="../../typings/node/node.d.ts" />
import * as express from 'express';
import * as path from 'path';
import {LiveFramework} from './bits/framework/live-framework.server';
import {Portal} from './bits/framework/portal.server';
import {MongoDbPersister} from './bits/framework/mongodb.persister.server';

let staticFolder = path.resolve(__dirname + '/../../client');

let app = express();

app.use(express.static(staticFolder));

app.route('/*').get(function(req, res) {
  res.sendFile(staticFolder+'/index.html');
});

let server = app.listen(process.env.PORT, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log('staticFolder: '+staticFolder);
  console.log('Server listening at http://%s:%s', host, port);
});

new LiveFramework(new Portal(server), new MongoDbPersister());
