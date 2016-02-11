// SHARED LIBRARIES
import {RelationshipSide} from './relationship-side.shared';

export class Relationship {
    constructor(
        private _parent      :RelationshipSide,
        private _child       :RelationshipSide,
        private _isSymmetric :boolean = false    
    ) {}
    
    get isSymmetric() { return this._isSymmetric; }
    
    get parent()    { return this._parent; }
    
    get child() { 
        // Enforce symmetry
        return this._isSymmetric ? this._parent : this._child;       
    }
    
    public makeSymmetric() {
        this._isSymmetric = true;
    }
}
