import {Component, View, Input} from 'angular2/angular2';

@Component({ selector:'section-heading' })
@View({
    directives: [],
    template: `
        <h1 class="text-center">{{text}}</h1>
    `
})
export class SectionHeading {
    @Input() text:string;
}