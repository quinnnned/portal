import { Decoration } from './decoration.shared';
import { MetaValue }  from './meta-value.shared';
import { Metadata }   from   './metadata.shared';
import { MetaSet }    from   './meta-set.shared';

export class MetaSystem { 
    
    private subsystems = {};
    
    private get prefix() :string { return this.systemName + ':'; }
    
    constructor(private systemName :string) {}
    
    public set(key :string, value:any, cls, propertyKey? :string, forceClass? :boolean) :void {
        Metadata.Set(this.prefix+key, value, cls, propertyKey, forceClass);
    }
    
    public update(key :string, updater :Function, cls, propertyKey? :string, forceClass? :boolean) :void {
        Metadata.Update(this.prefix+key, updater, cls, propertyKey, forceClass);
    }
    
    public get(key :string, cls, propertyKey? :string) :any {
        return Metadata.Get(this.prefix+key, cls, propertyKey);
    }
    
    public getSubsystem(subSystemName: string) {
        if (!this.subsystems[subSystemName]) {
            let fullName = this.prefix + subSystemName;
            this.subsystems[subSystemName] = new MetaSystem(fullName); 
        }
        return this.subsystems[subSystemName];
    }
    
    public decorateSet(
        key         :string, 
        value       :any, 
        forceClass  :boolean = false
    ) {
        return Decoration.Decorate( (target, fieldKey) => {
            let cls = fieldKey ? target.constructor : target;
            this.set(key, value, cls, fieldKey, forceClass);
        });
    }
    
    public decorateUpdate(
        key         :string, 
        updater     :Function, 
        forceClass  :boolean = false
    ) {
        return Decoration.Decorate( (target, fieldKey) => {
            let cls = fieldKey ? target.constructor : target;
            this.update(key, updater, cls, fieldKey, forceClass);
        });
    }
    
    public makeMetaValue(keyName :string) :MetaValue {
        return new MetaValue(keyName, this);
    }
    
    public makeMetaSet(keyName :string) :MetaSet {
        return new MetaSet(keyName, this);
    }
}
