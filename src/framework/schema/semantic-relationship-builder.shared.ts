import { RelationshipSide } from  './relationship-side.shared';
import { Relationship }     from       './relationship.shared';

// might need to move this down
export class SemanticRelationshipBuilder {
    
    private isParentContext = true;
   
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
    
    public getRelationship() : Relationship{
        return this.relationship;
    }
    
    public a(vertexClass) :SemanticRelationshipBuilder { 
        this.contextSide.setVertexClass(vertexClass);
        return this;        
    }
    
    public one(
        propertyKey :string
    ) :SemanticRelationshipBuilder { 
        this.contextSide.setPropertyKey(propertyKey);
        this.contextSide.setPropertyAsScalar();
        return this;   
    }
    
    public many(
        propertyKey :string
    ) :SemanticRelationshipBuilder { 
        this.contextSide.setPropertyKey(propertyKey);
        this.contextSide.setPropertyAsArray();
        return this;
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
        return this.isParentContext 
             ? this.relationship.parent 
             : this.relationship.child;
    }
    
    private switchToChildContext() :void {
        this.isParentContext = false;
    }    
}

