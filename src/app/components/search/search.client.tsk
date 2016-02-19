import {Component, View} from 'angular2/angular2';
import {RouteParams} from 'angular2/router';

@Component({ selector:'search' })
@View({
    directives: [],
    template: `<h3>You searched for "{{search}}"</h3>`
})
export class Search {
    constructor(routeData:RouteParams) {
        this.search = decodeURI(routeData.get('wildcard'));
    }
}