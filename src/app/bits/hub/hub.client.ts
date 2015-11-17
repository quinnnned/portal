var providers = [];

import {Portal} from '../framework/portal.client';
providers.push(Portal);

import {LiveObjectFactory} from '../framework/live-object-factory.client';
providers.push(LiveObjectFactory);


console.log(providers);
export var Providers = providers;