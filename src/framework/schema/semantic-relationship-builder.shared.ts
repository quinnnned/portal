import { RelationshipSide } from  './relationship-side.shared';
import { Relationship }     from       './relationship.shared';

var Context = {
    Parent : 'parent',
    Child  : 'child'
}

export class SemanticRelationshipBuilder {
    
    private context = Context.Parent;
    
    // Use this as entry point
    public static A(vertexClass) {
        // Some DI might be nice here
        let builder = new SemanticRelationshipBuilder(
            new Relationship(
                new RelationshipSide(),
                new RelationshipSide()
            )
        );
        return builder.a(vertexClass);
    }
    
    constructor( private relationship :Relationship ) {}
    
    public a(vertexClass) :SemanticRelationshipBuilder { 
        this.contextSide.setVertexClass(vertexClass);
        return this;        
    }
    
    public one(
        propertyKey :string
    ) :SemanticRelationshipBuilder | Relationship { 
        this.contextSide.setPropertyKey(propertyKey);
        this.contextSide.setPropertyAsScalar();
        return this.thisOrRelationship();   
    }
    
    public many(
        propertyKey :string
    ) :SemanticRelationshipBuilder | Relationship { 
        this.contextSide.setPropertyKey(propertyKey);
        this.contextSide.setPropertyAsArray();
        return this.thisOrRelationship();
    }
    
    public get and() :SemanticRelationshipBuilder { 
        this.switchToChildContext();
        return this; 
    }
    
    public get but() :SemanticRelationshipBuilder { 
        return this.and; 
    }
    
    public get symmetrically() :SemanticRelationshipBuilder {
        this.relationship.makeSymmetric();
        return this;
    }
    
    public get has() :SemanticRelationshipBuilder { 
        return this; 
    }
    
    private get contextSide() :RelationshipSide {
        return this.relationship[this.context];
    }
    
    private switchToChildContext() :void {
        this.context = Context.Child;    
    }  
    
    private thisOrRelationship() :SemanticRelationshipBuilder | Relationship {
        return this.context == Context.Parent ? this : this.relationship;
    }
}