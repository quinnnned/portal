import {Component, View, NgFor} from 'angular2/angular2';
import {ROUTER_DIRECTIVES, RouteConfig, Location} from 'angular2/router';
//import {LiveFramework, Portal, My} from './bits/framework/index.client';
import {Index} from './components/index/index.client';
import {Games} from './components/games/games.client';
//import {Search} from './components/search/search.client';
import {NavigationBar} from './components/nav/nav.client';
import {Game} from './model/game.shared';
import {getDataClasses} from '../framework/init.shared';

@Component({
    selector: 'app'
    //,providers: [LiveFramework, Portal]
})
@View({ 
    directives: [ROUTER_DIRECTIVES, NavigationBar],
    template:`
        <navigation-bar></navigation-bar>
        <div class="container theme-showcase" role="main">
            <router-outlet></router-outlet>
        </div>
    `
})
// <p>The current time is {{my.time}}</p>
            
            // <p>{{my.address.streetAddress}}</p>
            // <p>{{my.address.city}}, {{my.address.state}} {{my.address.zip}}</p>
        
            //  <a (click) = "my.like('thing',1,false)" href="#" >my.like</a>
        
            // <div *ng-for="#intensityLevel of colors">
            // <table >
            //   <tr *ng-for="#blueToGreen of intensityLevel">
            //     <td *ng-for="#color of blueToGreen" style="background-color:{{color}}"> {{color}}</td>
            //   </tr>
            // </table>
            
            // </div>


@RouteConfig([
    { path: '/', redirectTo: '/index'},
    { path: '/index', as: 'Index', component: Index},
    { path: '/games', as: 'Games', component: Games}
    //,{ path: '/*wildcard', component: Search} 
])

export class AppComponent { 
    
    //public my:My;
    
    public colors:any[];
   
    constructor(
        //private LiveFramework:LiveFramework
        ) {
        
        //this.my = LiveFramework.my;
        
        //var thing = new Game();
        
        //console.log(`I made a ${thing.constructor.name}`);
        
        // this.colors = [];
        
        // let hex = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
        
        // let i = 3*hex.length
        
        // while(i>=0) {
        //     this.colors[i]=[];
        //      hex.forEach((r,ri)=>{
        //         this.colors[i][ri] = [];
        //         hex.forEach((g,gi)=>{
        //           hex.forEach((b,bi)=>{
        //              if (ri<=bi && ri<=gi && i==(ri+gi+bi)){
        //               let color = '#'+r+g+b
        //               this.colors[i][ri].push(color);
        //              } 
        //           });
        //         });
        //     });
        //     i--;
        // }
        
       
        
    }
}
