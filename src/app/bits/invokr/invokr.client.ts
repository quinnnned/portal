
export class InvokrClient {
    
    private server: any;
    
    constructor() {
        console.log({
            name:this.constructor.name,
            stuff:this.getOwnPropertyNames,
            self:this
        });
    }
}

export function Invokable(what){
    return function(target, name, descriptor) {
        console.log({message:'decorating:'+what, args:arguments});
        if (!descriptor) return;
        target.invokables = target.invokables || {};
        target.invokables[what] = descriptor.value;
    };
};