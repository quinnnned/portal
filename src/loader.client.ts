import {bootstrap, provide} from 'angular2/angular2';
import {ROUTER_PROVIDERS, LocationStrategy, PathLocationStrategy, APP_BASE_HREF} from 'angular2/router';
import {AppComponent} from './app/app.client';

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    provide(APP_BASE_HREF, {useValue: '/'}),
    provide(LocationStrategy, { useClass: PathLocationStrategy })
]);