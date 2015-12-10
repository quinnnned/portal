import {Component, View} from 'angular2/angular2';
import {GameSearch} from './game-search.client'
import {SectionHeading} from '../partials/section-heading.client';

@Component({ selector:'games' })
@View({
    directives: [SectionHeading, GameSearch],
    template: `
        <section-heading text="What Should We Play?"></section-heading>
        <game-search></game-search>
    `
})
export class Games {}