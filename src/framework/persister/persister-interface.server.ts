import {Link, Persistable, Field, FieldValuePair} from './design.server';

export interface Persister {
    
    // Add a new object to a group
    persist(group :string, properties :FieldValuePair[]) :Promise<Persistable>
    
    // Remove an object
    remove(p :Persistable) :Promise<void>
    
    // Change the values of certain fields in the given object
    update(p :Persistable, changes :FieldValuePair[]) :Promise<Persistable>
    
    // Create a relationship between two objects
    relate(link :Link, p1 :Persistable, p2 :Persistable) :Promise<void>
    
    // Destroy a relationship between two objects
    unrelate(link :Link, p1 :Persistable, p2 :Persistable) :Promise<void>
    
    // Return a (possibly nested) object
    traverse(p :Persistable, selection :Field[]) :Promise<Array<Persistable>>
}