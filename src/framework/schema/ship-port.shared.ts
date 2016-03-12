export class ShipPort {
   
    constructor(
        private _class :Function, 
        private _field :string, 
        private _isOne :boolean
    ){}
    
    get class() :Function {
        return this._class;
    }
    
    get field() :string {
        return this._field;
    }
    
    get isOne() :boolean {
        return this._isOne;
    }
}