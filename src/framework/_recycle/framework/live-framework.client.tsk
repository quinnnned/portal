/// <reference path="../../../../typings/reflect-metadata/reflect-metadata.d.ts" />

import {Portal} from './portal.client';
import {My} from './my.shared';


export function LiveField(target, property) {
	if (property === undefined) return;
	let liveFieldsKey = 'live-framework:live-fields';	
	let liveFields = Reflect.getMetadata(liveFieldsKey, target) || [];
	liveFields.push(property);
	Reflect.defineMetadata(liveFieldsKey, liveFields, target);
}

let whatever = () => {}; 

@whatever
export class LiveFramework {
	
	private subscriptions = {}
	
	public my:My;
	
	constructor(private Portal:Portal) {
		this.my = this.getLiveObject(My, 'my');
	}
	
	private getLiveObject(objectClass, objectTag:string) : any {
		if (this.subscriptions[objectTag]) {
			return this.subscriptions[objectTag].wrapper;
		}
		
		this.subscriptions[objectTag] = { real: new objectClass() }
		
		let object = this.subscriptions[objectTag].real;
		
		this.Portal.subscribe(objectTag, (objectUpdates) => {
			for(property in objectUpdates) {
				object[property] = objectUpdates[property];	
			}
		});
		
		let descriptors = {};
		Reflect.getMetadata('live-framework:live-fields', object)
			.forEach( (field) => {
				
			let propertyTag = objectTag + '.' + field;
			
			let propertyClass = Reflect.getMetadata('design:type', object, field);
			
			let fieldGetter = () => { return object[field]; };
			
			let methodGetter = () => {
				return (...args) => {
					let method = field;
					this.callRemoteProcedure(objectTag, method, args);
					object[field].apply(object, args);
				}
			};
			
			let liveObjectGetter = () => {
				return this.getLiveObject(propertyClass, propertyTag);	
			};
			
			let liveListGetter = () => { return []; };
			
			let getterSelector = (pClass) => {
				switch (pClass) {
					case Function : return methodGetter;
					case Array    : return liveListGetter;
					case Number   : return fieldGetter;
					case String   : return fieldGetter;
					case Boolean  : return fieldGetter;
					default       : return liveObjectGetter;
				}			
			}
			
			let descriptor =  {
				configurable: true,
				enumerable: true,
				get : getterSelector(propertyClass)
			};
			
			descriptors[field] = descriptor;
		});
		
		console.log(descriptors);
		
		this.subscriptions[objectTag].wrapper = Object.defineProperties(new objectClass(), descriptors); 
		
		
		console.log(this.subscriptions[objectTag].wrapper);
		
		return this.subscriptions[objectTag].wrapper; 
	}
	
	/**
	 * uoi = 'Universal Object Identifier'
	 */
	private callRemoteProcedure(uoi: string, method: string, args: array) {
		console.log('RPC: ', {
			o : uoi, 
			m : method,
			a : args
		});
		
		this.Portal.publish('live-framework:remote-procedure-call', {
			o: uoi,
			m: method,
			a: args
		});		
	}
}