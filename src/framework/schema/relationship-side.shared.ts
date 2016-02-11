// holds one class's 'perspective' on the relationship
// it should be possible to do:
//   let x =  new this.vertextClass()
//   x[propertyKey] !== undefined;    //true
//   isMany == x[propertyKey] instanceof Array; //true (maybe Set/Map too. Haven't decided)
export class RelationshipSide {
    
    private vertexClass;
    private propertyKey  :string;
    private isMany       :boolean = false;
    
    public setVertexClass(vertexClass) {
        this.vertexClass = vertexClass;
    }
    
    public getVertexClass() {
        return this.vertexClass;
    }
    
    public setPropertyKey(propertyKey :string) {
        this.propertyKey = propertyKey;
    }
    
    public getPropertyKey() :string {
        return this.propertyKey;
    }
    
    public setPropertyAsArray() {
        this.setIsMany(true);
    }
    
    public setPropertyAsScalar() {
        this.setIsMany(false);
    }
    
    public setIsMany(isMany :boolean) {
        this.isMany = isMany;
    }
    
    public getIsMany() :boolean {
        return this.isMany;
    }
}
