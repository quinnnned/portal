import * as io from 'socket.io/socket.io.js';
      
export class Socket {
    
    constructor() {
        var socket = io.connect('https://portal-javascriptsandbox.c9.io/',{
            transports: ['websocket', 'polling']
        });
        
        socket.on('message', (message) => {
            console.log(message);
            socket.emit('message', { payload: 'client->server' });
        });
        
        [
            'connect', 
            'reconnect', 
            'reconnecting', 
            'reconnect_attempt', 
            'connect_error'
        ].forEach((event)=>{
            socket.on(event, () => {console.log('socket:'+event)});
        });
        
    }
    
    send(){
        
    }
}      