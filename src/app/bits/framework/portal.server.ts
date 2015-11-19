/// <reference path="../../../../typings/socket.io/socket.io.d.ts" />
import * as Server from 'socket.io';

export class Portal {
	constructor(server, database) {
		let io = Server(server, {
			transports:['websocket', 'polling']
		});
		
		setInterval( () => {
			io.emit('my.time', Date().toString());
			io.emit('my.address.streetAddress', '14117 North Rockwell Ave Apt 8203');
			io.emit('my.address.state', 'OK');
			io.emit('my.address.city', 'Oklahoma City');
			io.emit('my.address.zip', '73142');
		}, 1000)
		
		io.on('connection', (socket) => {});
	}
} 