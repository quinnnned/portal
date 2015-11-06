var angular2_1 = require('angular2/angular2');
var app_client_1 = require('./app/app.client');
var hub_client_1 = require('./app/bits/hub/hub.client');
angular2_1.bootstrap(app_client_1.AppComponent, hub_client_1.Providers);
