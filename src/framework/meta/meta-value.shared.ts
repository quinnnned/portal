import { MetaSystem } from './meta-system.shared';

export class MetaValue {
    
    constructor(
        protected key  :string, 
        protected meta :MetaSystem
    ) {}
    
    public set(value :any, cls :Function, fieldKey? :string) : void {
        this.meta.set(this.key, value, cls, fieldKey);
    }
    
    public get(cls :Function, fieldKey? :string) :any {
        return this.meta.get(this.key, cls, fieldKey);
    }
    
    public decorate(value :any) {
        return this.meta.decorateSet(this.key, value);
    }
}