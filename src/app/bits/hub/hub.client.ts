var providers = [];

import {Portal} from '../framework/portal.client';
providers.push(Portal);

import {LiveFramework} from '../framework/index.client';
providers.push(LiveFramework);

export var Providers = providers;