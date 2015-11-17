/// <reference path="../../../../typings/reflect-metadata/reflect-metadata.d.ts" />

import {Portal} from './portal.client';
import {My} from './my.shared';

let whatever = ()=>{}; 

@whatever
export class LiveObjectFactory {
	
	public my:My;
	
	constructor(private Portal:Portal) {
		this.my = this.wrapObject(new My(), 'my');
	}
	
	
	
	
	
	
	
	private wrapObject(object:any, objectTag:string) : any {
		
		let wrapped = {};
		
		let subscribed = {}
		
		let subscribe = (property) => {
			
			if (subscribed[property]) return;
				
			subscribed[property] = true;
			let propertyTag = objectTag + '.' + property;	
							
			this.Portal.subscribe(propertyTag, (value) => {
				object[property] = value;
			});
		}
		
		let wrap = (property, propertyClass) => {
			if (!wrapped.hasOwnProperty(property)) {
				let propertyTag = objectTag + '.' + property;	
				wrapped[property] = this.wrapObject(new propertyClass(), propertyTag);
			}	
			return wrapped[property];
		};
		
		let getWrappedValue = (target, property) => {
			let propertyValue = target[property];
			let propertyTag = objectTag + '.' + property;
			let propertyClass = Reflect.getMetadata('design:type', target, property);
			
						
			switch (propertyClass) {
				// Undefined is always assumed to be a remote procedure call
				case undefined: return (...args)=>{
					console.log('RPC: %s(%s)', propertyTag,args);
					console.log({wrapped:wrapped,subscribed:subscribed});
				};
				break; 
				case Number: subscribe(property); return propertyValue; break;
				case String: subscribe(property); return propertyValue; break;
				case Boolean: subscribe(property); return propertyValue; break;
				case Array: return []; break;
				default: return wrap(property, propertyClass)
			}	
		}
		
		return new Proxy(object, {
			get : getWrappedValue,
			set: () => {
				console.log('LiveObjects are read-only');
				//throw 'Live objects are read-only';
			}
		})
	}
}