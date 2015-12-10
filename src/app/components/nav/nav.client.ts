import {Component, View} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';
 
@Component({ selector:'navigation-bar' })
@View({
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/components/nav/nav.html'
})
export class NavigationBar {}