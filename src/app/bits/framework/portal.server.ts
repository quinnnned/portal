/// <reference path="../../../../typings/socket.io/socket.io.d.ts" />
import * as Server from 'socket.io';

export class Portal {
	constructor(server, database) {
		let io = Server(server, {
			transports:['websocket', 'polling']
		});
		
		// let id = database.save({
		// 	thing   : "", 
		// 	stuffs  : '2', 
		// 	another : [ 'hi', 'there', 'friend' ],
		// 	nest : {
		// 		nest: {
		// 			value:0
		// 		}
		// 	},
		// 	count : 0, 
		// 	time    : Date.now() 
		// });
		
		// console.log('saved id:'+id);
		
		setInterval( () => {
			io.emit('my.time', Date().toString());
			
			io.emit('my.address.streetAddress', '14117 North Rockwell Ave Apt 8203');
			io.emit('my.address.state', 'OK');
			io.emit('my.address.city', 'Oklahoma City');
			io.emit('my.address.zip', '73142');
			
		}, 1000)
		
		io.on('connection', (socket) => {
			// socket.on('subscribe', (request) => {
			// 	let data = {};
			// 	socket.emit(request.tag, data);	
			// });	
		});
	}
} 