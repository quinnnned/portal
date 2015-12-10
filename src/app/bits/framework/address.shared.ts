
import {LiveField} from './live-framework.client'

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