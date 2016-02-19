import {RelationshipSide} from  './relationship-side.shared';
import {Relationship}     from       './relationship.shared';
import {Metadata}         from     '../meta/metadata.shared.later';

export class Schema {

    public static GROUP_METADATA_KEY = 'orm-group';

    public static Group(groupName:string) : ClassDecorator {
        return (modelClass)=>{
            Metadata.setClassMetadata(
                modelClass, 
                Schema.GROUP_METADATA_KEY, 
                groupName
            );
        };
    }
    
    public static getGroup(modelClass):string {
        let metadataGroup = Metadata.getClassMetadata(
            modelClass,
            Schema.GROUP_METADATA_KEY
        );
        return metadataGroup || modelClass.name;
    }
    
    public static Test(target, propertyKey: string, descriptor? :Object) : void {
        // console.log('----------------------------------------------------------');
        // console.log(target, propertyKey)
        // var keys = Metadata.getAllKeys(target, propertyKey);
        // console.log(keys);
        
        // var vals = keys.map((key)=>{
        //   return Metadata.getMetadata(target, key, propertyKey);  
        // });
        // console.log(vals);
        
        // var types = vals.map((x)=>{return typeof x});
        // console.log(types);
        
        // console.log(descriptor);
    }
    
    // // Semantic Interface
    // public static A(parentClass) {
    //     let parentSide = new RelationshipSide();
    //     let childSide  = new RelationshipSide();
    //     parentSide.setVertexClass(parentClass);
        
    //     let parentSemantic = {
    //         has : {
    //             one : (parentProperty :string) => {
    //                 parentSide.setPropertyAsScalar();
    //                 return parentOneMany(parentProperty);
    //             },
    //             many : (parentProperty :string) => {
    //                 parentSide.setPropertyAsArray();
    //                 return parentOneMany(parentProperty);
    //             }
    //         }
    //     }
        
    //     let parentOneMany = (parentProperty) => {
    //         parentSide.setPropertyKey(parentProperty);
    //         return {
    //             but: childA,
    //             and: childA
    //         }
    //     }
        
    //     let childA = {
    //         a: (childClass) => {
    //             childSide.setVertexClass(childClass);
    //             return childSemantic;
    //         } 
    //     }
        
    //     let childSemantic = {
    //         has : {
    //             one : (childProperty :string) => {
    //                 childSide.setPropertyAsScalar();
    //                 return childOneMany(childProperty);
    //             },
    //             many : (childProperty :string) => {
    //                 childSide.setPropertyAsArray();
    //                 return childOneMany(childProperty);
    //             }
    //         }
    //     }
        
    //     let childOneMany = (childProperty :string) => {
    //         childSide.setPropertyKey(childProperty);
    //         return new Relationship(parentSide, childSide, false);
    //     }
        
    //     return parentSemantic;
    // }
}

