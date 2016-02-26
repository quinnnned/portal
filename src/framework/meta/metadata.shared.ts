import './reflect.shared';

export class Metadata {
    
    public static Has(cls, fieldKey? :string) :boolean{
        let target = fieldKey ? cls.prototype : cls;
        return Reflect.getMetadataKeys(target, fieldKey).length > 0;
    }
    
    public static Set(
        metadataKey   :string, 
        metadataValue :any, 
        cls           :Function, 
        fieldKey?     :string,
        forceClass?   :boolean 
    ) :void {
        let target = Metadata.GetTargetFromClass(cls, fieldKey, forceClass);
        let property = forceClass ? undefined : fieldKey;
        Reflect.defineMetadata(metadataKey, metadataValue, target, property);
    }
    
    public static Get(
        metadataKey :string, 
        cls         :Function, 
        fieldKey?   :string,
        forceClass? :boolean
    ) :any {
        let target = Metadata.GetTargetFromClass(cls, fieldKey, forceClass);
        let property = forceClass ? undefined : fieldKey;
        return Reflect.getMetadata(metadataKey, target, property);
    }
    
    public static Update(
        metadataKey :string, 
        updater     :Function, 
        cls         :Function, 
        fieldKey?   :string,
        forceClass? :boolean
    ) :void {
        let oldValue = Metadata.Get(metadataKey, cls, fieldKey, forceClass);
        let newValue = updater(oldValue, cls, fieldKey, forceClass);
        Metadata.Set(metadataKey, newValue, cls, fieldKey, forceClass);
    }
    
    public static GetTargetFromClass(
        cls           :Function, 
        fieldKey?     :string, 
        forceClass?   :boolean
    ) :Function|Object {
        if (forceClass) return cls;
        return fieldKey ? cls.prototype : cls;
    }
    
    /**
     * This only exists for debugging purposes. 
     */
    public static Print(cls, fieldKeys=[], log=null) {
        log = log || console.log;
        fieldKeys.unshift(undefined);
        fieldKeys.forEach((fieldKey) => {
            let suffix = fieldKey ? `.${fieldKey}` : '';
            let target = fieldKey ? cls.prototype : cls;
            log(`Metadata for ${cls.name}${suffix}`);
            Reflect.getMetadataKeys(target, fieldKey).forEach((key)=>{
                let value = Reflect.getMetadata(key, target, fieldKey);
                log(`  "${key}" : ${value}`);
            });
        });
    }
    
    
}