import './reflect.shared';

export class Metadata {
    
    public static Has(cls, fieldKey? :string) :boolean{
        let target = fieldKey ? cls.prototype : cls;
        return Reflect.getMetadataKeys(target, fieldKey).length > 0;
    }
    
    public static Set(metadataKey, metadataValue, cls, fieldKey? :string) :void {
        let target = fieldKey ? cls.prototype : cls;
        Reflect.defineMetadata(metadataKey, metadataValue, target, fieldKey);
    }
    
    public static Get(metadataKey, cls, fieldKey? :string) :any {
        let target = fieldKey ? cls.prototype : cls;
        return Reflect.getMetadata(metadataKey, target, fieldKey);
    }
   
    public static PrintAll(cls, fieldKeys=[], log=null) {
        log = log || console.log;
        fieldKeys.unshift(undefined);
        log();
        fieldKeys.forEach((fieldKey) => {
            let suffix = fieldKey ? `.${fieldKey}` : '';
            let target = fieldKey ? cls.prototype : cls;
            log(`Metadata for ${cls.name}${suffix}`);
            Reflect.getMetadataKeys(target, fieldKey).forEach((key)=>{
                let value = Reflect.getMetadata(key, target, fieldKey);
                log(`  ${key} : ${value}`);
            });
        });
    }
}