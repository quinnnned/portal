export class Entity {
    
    public static GROUP_PROPERTY = 'EntityPersistenceGroup';
    public static KEY_PROPERTY   = 'EntityPersistenceKey';
    
    constructor(group:string, key:string){
        if (group) this.setGroup(group);
        if (key)   this.setKey(key);
    }
    
    public setGroup(group) {
        this[Entity.GROUP_PROPERTY] = group;
    }
    
    public getGroup() {
        return this[Entity.GROUP_PROPERTY];
    }

    public setKey(key) {
        this[Entity.KEY_PROPERTY] = key;
    }
    
    public getKey() {
        return this[Entity.KEY_PROPERTY];
    }
}