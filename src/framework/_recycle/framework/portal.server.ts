/// <reference path="../../../../typings/socket.io/socket.io.d.ts" />
import * as Server from 'socket.io';

export class Portal {
	constructor(server) {
		let io = Server(server, {
			transports:['websocket', 'polling']
		});
		
		setInterval( () => {
			io.emit('my', { time : Date().toString() });
			io.emit('my.address', {
				streetAddress : '14117 North Rockwell Ave Apt 8203',
				state         : 'OK',
				city          : 'Oklahoma City',
				zip           : '73142'	
			});
		}, 1000);
		
		io.on('connection', (socket) => {
			console.log('connected!');
			socket.on('live-framework:remote-procedure-call', (data)=>{
				console.log('data',data);
			});
		});
	}
} 