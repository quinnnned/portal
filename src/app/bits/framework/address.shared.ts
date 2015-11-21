
import {LiveField} from './live-framework.client'

let whatever = ()=>{}


export class Address {
	
	@LiveField
	public streetAddress:string;
	
	@LiveField
	public city:string;
	
	@LiveField
	public state:string;
	
	@LiveField
	public zip:string;
}