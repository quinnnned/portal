import '../utils/reflect.shared';
// import {} from '../utils/reflect.shared'; // try this later

export class Metadata { 
    
    public static FRAMEWORK_METADATA_PREFIX = 'mogwai-';
    
    public static setClassMetadata(modelClass, key:string, value:any) {
        Reflect.defineMetadata(
            Metadata.FRAMEWORK_METADATA_PREFIX+key,
            value, 
            modelClass
        );    
    }
    
    public static getClassMetadata(modelClass, key :string) {
        return Reflect.getMetadata(
            Metadata.FRAMEWORK_METADATA_PREFIX+key, 
            modelClass
        );
    }
    
    public static getAllKeys(modelClass, propertyKey :string) {
        return Reflect.getMetadataKeys(modelClass, propertyKey);
    }
    
    public static getMetadata(modelClass, key :string, propertyKey:string) {
        return Reflect.getMetadata(key, modelClass, propertyKey);
    }
}
