var providers = [];

import * as module from '../module/module.client';
providers.push(module.Module);
export {Module} from '../module/module.client';

import * as module2 from '../module2/module2.client';
providers.push(module2.Module2);
export {Module2} from '../module2/module2.client';

export var Providers = providers;