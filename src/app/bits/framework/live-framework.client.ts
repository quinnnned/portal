/// <reference path="../../../../typings/reflect-metadata/reflect-metadata.d.ts" />

import {Portal} from './portal.client';
import {My} from './my.shared';


export function LiveField(target, property) {
	if (property === undefined) return;
	let liveFieldsKey = 'LiveFramework:LiveFields';	
	let liveFields = Reflect.getMetadata(liveFieldsKey, target) || [];
	liveFields.push(property);
	Reflect.defineMetadata(liveFieldsKey, liveFields, target);
}

let whatever = ()=>{}; 

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
		
		Reflect.getMetadata('LiveFramework:LiveFields', object)
			.forEach( (field) => {
				
			let propertyTag = objectTag + '.' + field;
			
			let propertyClass = Reflect.getMetadata('design:type', object, field);
		
			descriptors[field] = {
				configurable: true,
				enumerable: true,
				get : () => {
					let propertyValue = object[field];
					switch (propertyClass) {
						case Function : return function(){
							console.log('RPC: ', {
								tag: objectTag,
								method: field,
								class:objectClass.name,
								arguments: arguments
							});
							propertyValue.apply(object, arguments);
						}; break;
						case Number   : return propertyValue; break;
						case String   : return propertyValue; break;
						case Boolean  : return propertyValue; break;
						case Array    : return []; break;
						default       : return this.getLiveObject(propertyClass, propertyTag);
					}	
				}
			};
		});
		
		this.subscriptions[objectTag].wrapper = Object.defineProperties(new objectClass(), descriptors); 
		
		return this.subscriptions[objectTag].wrapper; 
	}
}