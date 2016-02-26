import { MetaSystem } from '../meta/meta-system.shared';
import { Decoration } from  '../meta/decoration.shared';
import { MetaValue }  from  '../meta/meta-value.shared';
import { MetaSet }    from    '../meta/meta-set.shared';

export class SchemaDecorators {
    
    constructor(
        private meta :MetaSystem
    ) {
        // Class-level Metadata Keys
        this.groupMeta  = this.meta.makeMetaValue('group');
        this.fieldsMeta = this.meta.makeMetaSet('fields');
        
        // Field-level Metadata Keys
    }
    
    // Schema.Group, Schema.GetGroup
    private groupMeta : MetaValue;
    public Group(groupName :string) { 
        return Decoration.Decorate( (cls) => {
            this.groupMeta.set(groupName, cls);
        });
    }
    public GetGroup(cls) { 
        return this.groupMeta.get(cls); 
    }

    // Schema.Field, Schema.GetFields
    private fieldsMeta : MetaSet;
    public get Field() { 
        return Decoration.Decorate( (proto, field) => {
            let cls = proto.constructor;
            this.fieldsMeta.add(field, cls);
        });
    }
    public GetFields(cls) { 
        return this.fieldsMeta.get(cls); 
    }
    
    
    
    // Aliases
    public get Table() { return this.Group };
    public get Collection() { return this.Group };
    public get Column() { return this.Field }; 
    
}
