// SERVER-ONLY LIBRARIES
import { Link } from '../persister/design.server';
         
// SHARED LIBRARIES
import { Relationship } from './relationship.shared';
import { Schema }       from       './schema.shared';      

export class SchemaToPersister {
    public static RelationshipToLink(r :Relationship) :Link {
        
        // Convert to simple types:
        let isSymmetric  = r.isSymmetric,
            parentGroup  = Schema.getGroup(r.parent.getVertexClass()),
            parentField  = r.parent.getPropertyKey(),
            parentIsMany = r.parent.getIsMany(),
            childGroup   = Schema.getGroup(r.child.getVertexClass()),
            childField   = r.child.getPropertyKey(),
            childIsMany  = r.child.getIsMany();
        
        // Create constant functions
        return {
            getIsSymmetric      : () => isSymmetric,
            getLinkParentGroup  : () => parentGroup,
            getLinkParentField  : () => parentField,
            getLinkParentIsMany : () => parentIsMany,
            getLinkChildGroup   : () => childGroup,
            getLinkChildField   : () => childField,
            getLinkChildIsMany  : () => childIsMany,
        };
    }
}