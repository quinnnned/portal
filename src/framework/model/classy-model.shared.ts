export class ClassyModel {
    constructor(
        private classes,
    ) {}    
    
    public getClass(classKey :string) {
        return this.classes[classKey] || null;
    }
    
    public hasClass(classKey :string) {
        return ( undefined == this.getClass(classKey) );
    }
}