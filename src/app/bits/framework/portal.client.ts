import * as io from 'socket.io/socket.io.js';

export class Portal {
	
    private socket;
    
    private socketQueue = [];
    
    private socketConnected = false;
    
    constructor() {
        
        let local = 'http://localhost:8080/';
        
        let cloud9 = 'https://portal-javascriptsandbox.c9.io/'
        
        this.socket = io.connect(cloud9, {
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
        console.log('Subscribing to "%s"',tag);
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
}

