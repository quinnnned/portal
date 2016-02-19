import {Metadata} from './metadata.shared';
import {Decoration} from './decoration.shared';

export class MetaSystem { 
    
    private subsystems = {};
    
    constructor(private prefix :string) {}
    
    public getDecorator(key :string, value :any) {
        var fullKey = this.prefix + key;
        return Decoration.Metadata(fullKey, value);
    }
    
    public getSubsystem(subprefix: string) {
        if (!this.subsystems[subprefix]) {
            let fullPrefix = this.prefix + subprefix;
            this.subsystems[subprefix] = new MetaSystem(fullPrefix); 
        }
        return this.subsystems[subprefix];
    }
    
    public getClassMetadata(modelClass, key :string) {
        return Metadata.Get(
            this.prefix + key,
            modelClass
        );
    }
    
    public getFieldMetadata(modelClass, propertyKey:string, key :string) {
        return Metadata.Get(
            this.prefix + key, 
            modelClass,
            propertyKey
        );
    }
   
    public setFieldMetadata(
        modelClass, 
        propertyKey :string, 
        key         :string, 
        value       :any
    ) {
        Metadata.Set(
            this.prefix + key, 
            value, 
            modelClass,
            propertyKey
        );
    } 
    
    public setClassMetadata(modelClass, key :string, value :any) {
        Metadata.Set(
            this.prefix + key,
            value, 
            modelClass
        );    
    }
    
}
