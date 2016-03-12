import { MetaValue } from '../meta/meta-value.shared'
import { ShipPort } from './ship-port.shared';
import { Ship } from './ship.shared';


export class ShipBuilder {
    
    get has() { return this; }
    
    private _isExtended :boolean;   
    
    // There's some risk of object cesspool here. Be careful.
    private _class :Function;
    private _field :string;   
    private _isOne :boolean; 
    
    constructor( private _shipMeta :MetaValue ) {
        
    }
    
    public a(cls :Function) :ShipBuilder{
        this._class = cls;
        return this;
    }
    
    public one(field :string) :ShipBuilder { 
        return this.setFieldAndCardinality(field, true);
    }
    
    public many(field :string) :ShipBuilder { 
        return this.setFieldAndCardinality(field, false); 
    }
    
    get and() :ShipBuilder {
        this._isExtended = true;
        return this;
    }
    
    /**
     * For now, 'but' is an alias for 'and'. in the future, think about throwing 
     * errors when 'but' is used for 1-1 or *-* ships
     */
    public get but() :ShipBuilder { return this.and; }
    
    private resetPortData() {
        this._isExtended = false;
        this._class = null;
        this._field = null;
        this._isOne = null;
    }
    
    private get isPortComplete() :Boolean{
        return true;
        // return ( ( this._class instanceof Function ) || this._isExtended ) 
        //     && (this._field instanceof String)
        //     && (this._field.length > 0)
        //     && (this._isOne instanceof Boolean);
    }
    
    private complete() {
        // Check ship port data
        if (!this.isPortComplete) {
            this.fail('port was incomplete. relationship metadata not added.')
            return;
        } 
        
        // set metavalue
        let parent = new ShipPort(this._class, this._field, this._isOne);
        let ship = new Ship(parent, parent);
        this._shipMeta.set(ship, parent.class, parent.field);
        
        // Reset ship port data
        this.resetPortData();
    }
    
    private setFieldAndCardinality(field, isOne) :ShipBuilder {
        this._isOne = isOne;
        this._field = field;
        this.complete();
        return this;
    }
    
    // these should probably go to some central error handling
    private fail(message :string) {
        throw new Error(message);
    }
    
    private warn(message :string) {
        console.warn(message);
    }
}