import {Component} from 'angular2/angular2';
import {Module, Module2} from './bits/hub/hub.client';
import {Socket} from './bits/socket/socket.client';
import {InvokrTest} from './bits/invokrTest/invokrTest.client';
import {Invokable} from './bits/invokr/invokr.client';

@Invokable('AppComponent')
@Component({
    selector: 'my-app',
    template: '<h1>My First {{thing}} {{stuff}} Angular 2 App</h1>'
})
export class AppComponent { 
    
    constructor(private module:Module, private module2:Module2) {
        var socket = new Socket();
        
        let test = new InvokrTest();
        
        this.invokables.myfunction("blah");
    }
    
    public thing:string = 'this is a thing';
    
    public stuff:string = 'and some stuff';
    
    @Invokable('myfunction')
    public thingfunction(data) {
        console.log(data);
    }
}
