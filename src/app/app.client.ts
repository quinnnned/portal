import {Component,NgFor} from 'angular2/angular2';
import {LiveFramework, My} from './bits/framework/index.client';

@Component({ 
    selector: 'my-app', 
    directives: [NgFor]
    template:`
        <p>The current time is {{my.time}}</p>
        <p>{{my.address.streetAddress}}</p>
        <p>{{my.address.city}}, {{my.address.state}} {{my.address.zip}}</p>
        <a (click) = "my.address.like()" href="#" >like</a>
        <div *ng-for="#intensityLevel of colors">
        <table >
          <tr *ng-for="#blueToGreen of intensityLevel">
            <td *ng-for="#color of blueToGreen" style="background-color:{{color}}"> {{color}}</td>
          </tr>
        </table>
        
        </div>
    `
})

export class AppComponent { 
    
    public my:My;
   
    constructor(private LiveFramework:LiveFramework) {
        this.my = LiveFramework.my;
        
        this.colors = [];
        
        let hex = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
        
        let i = 3*hex.length
        
        while(i>=0) {
            this.colors[i]=[];
             hex.forEach((r,ri)=>{
                this.colors[i][ri] = [];
                hex.forEach((g,gi)=>{
                   hex.forEach((b,bi)=>{
                     if (ri<=bi && ri<=gi && i==(ri+gi+bi)){
                       let color = '#'+r+g+b
                       this.colors[i][ri].push(color);
                     } 
                   });
                });
            });
            i--;
        }
        
       
        
    }
}
