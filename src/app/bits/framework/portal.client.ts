import * as io from 'socket.io/socket.io.js';

export class Portal {
	
    private socket;
    
    private socketQueue = [];
    
    private socketConnected = false;
    
    constructor() {
        
        this.socket = io.connect('http://localhost:8080/', {
            transports: ['websocket', 'polling']
        });
        
        this.socket.on('connect', () => {            
            this.socketQueue.forEach((item) => {
                this.socket.emit(item.label, item.data);    
            });
            this.socketConnected = true;
        });
        
        this.socket.on('disconnect', () => {
            this.socketConnected = false;
        })
    }
        
    public publish(tag:string, data:any):void {
        this.safeEmit(tag, data);
    }
    
    public subscribe(tag:string, callback:(data:any)=>void) {
        console.log('subscribing to '+tag);
        this.socket.on(tag, callback);    
    }
   
    private safeEmit(label:string, data:any):void {
        if (this.socketConnected) {
            this.socket.emit(label, data);
        }
        
        this.socketQueue.push({
            label:label, 
            data:data
        });
    }
     
    // public getLiveThing(id : Number): any {
    //     this.safeEmit('subscribe', { id : id } );
    //     return ( (id : Number) => {
    //         var thing : Whatever = new Whatever();
    //         let proxyObject : any = new Proxy(thing, {
    //             get: function(object:Object, property) {
    //                 if (object[property] === undefined) return null;
    //                 return object[property]
    //             } 
    //         }); 
    //         this.socket.on(id.toString(), (newThing) => {
    //             thing.time = newThing.time;
    //             thing.thing = newThing.thing;
    //             thing.ready = true;
    //         }) 
    //         return proxyObject; 
    //     })(id);
    // }
}


// export class Whatever {
//     public ready: boolean = false;
//     public name: String;
//     public count: Number;
//     public like() {
        
//     }
//     public time: Number;
//     public thing: Date;
// }


