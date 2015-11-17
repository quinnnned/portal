

import {Component} from 'angular2/angular2';
import {My} from './bits/framework/my.shared';
import {LiveObjectFactory} from './bits/framework/live-object-factory.client';

@Component({
    selector: 'my-app',
    template: `
        <p>{{my.time}}</p>
        <a (click) = "clickedThere()" href="#" >click here</a>
        
        
        <h1>Time: {{my.time}}</h1>
        <p>{{my.address.streetAddress}}</p>
        <p>{{my.address.city}},{{my.address.state}} {{my.address.zip}}</p>
        
    `
    // <p>{{my.aNumber}}</p>
        // <p>{{my.aString}}</p>
        // <p>{{my.any}}</p>
        // <p>{{my.void}}</p>
        // <p>{{my.numberArray}}</p>
        // <p>{{my.stringArray}}</p>
        // <p>{{my.aBoolean}}</p>
        // <p>{{my.addressArray}}</p>
        
})
export class AppComponent { 
    
    public my:My;
   
    constructor(private LiveObjectFactory:LiveObjectFactory) {
        this.my = LiveObjectFactory.my;
    }
    
    clickedThere() : void {    
        this.my.like();
    }
}
