import {bootstrap, provide} from 'angular2/angular2';
import {ROUTER_PROVIDERS, LocationStrategy, PathLocationStrategy,APP_BASE_HREF} from 'angular2/router';
import {AppComponent} from './app/app.client';
//import {Providers} from './app/bits/hub/hub.client';

bootstrap(AppComponent, [
    //Providers,
    ROUTER_PROVIDERS,
    provide(APP_BASE_HREF, {useValue: '/'})
    provide(LocationStrategy, { useClass: PathLocationStrategy })
]);