export class BoundParameters {
    
    private parameters = {};
    
    private keys = [];
    
    public static fromObject(object:any) {
        var params = new BoundParameters();
        
        Object.getOwnPropertyNames(object).forEach( (key) => {
            let value = object[key];
            params.add(key, value);
        });
        
        return params
    }
    
    public add(key, value) {
        this.keys.push(key);
        this.parameters[key] = value;
    }
    
    public asObject() {
        return this.parameters;
    }
    
    public asListString():String {
        return this.keys.map( (key) => {
            return `'${key}',${key}`;
        }).join(',');
    }
}