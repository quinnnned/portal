export class MockDatabase {
	
	private storage = [];
	
	private id = 0;
	
	save(object){
		//console.log('saving object:' + JSON.stringify(object));
		object._id = this.id++;
		this.storage[object._id] = object;
		return object._id;
	}
	
	load(id) : any{
		let object : any = this.storage[id];
		//console.log('loading object' + JSON.stringify(object));
		return object;
	}
};