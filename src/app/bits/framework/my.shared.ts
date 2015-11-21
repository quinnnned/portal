/// <reference path="../../../../typings/reflect-metadata/reflect-metadata.d.ts" />

import {Address} from './address.shared'
import {LiveField} from './live-framework.client'

@LiveField
export class My {
	
	@LiveField
	public time:string;

	@LiveField
	public address:Address;
	
	@LiveField
	public like() {
		console.log('liked');
	}
}