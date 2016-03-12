import { ShipPort } from './ship-port.shared';

export class Ship {
    
    constructor(
        private _parent :ShipPort, 
        private _child :ShipPort
    ) {}
    
    public get isHomogeneous() :boolean {
        return this.parent.class === this.child.class;
    }
    
    public get isSymmetric() :boolean {
        return this.isHomogeneous
            && ( this.parent.field === this.child.field )
            && ( this.parent.isOne === this.child.isOne );
    }
    
    public get parent() :ShipPort {
        return this._parent;
    }
    
    public get child() :ShipPort {
        return this._child;
    }
}