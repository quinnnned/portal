import {Component, View} from 'angular2/angular2';
import {SectionHeading} from '../partials/section-heading.client';


@Component({ selector:'index' })
@View({
    directives: [SectionHeading],
    template: `
        <section-heading text="Here's What The Group Has Decided:"></section-heading>
    `
})
export class Index {}