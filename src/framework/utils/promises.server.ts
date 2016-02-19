export var Promise = require('promise');

// A promise factory is a parameterless function that returns a promise
export interface PromiseFactory<T> { 
    () :Promise<T>; 
}

// Merges an array of promise factories into a single promise factory.
// Executes provided promises asyncronously.
export var ParallelAll = (
    ...promiseFactories :PromiseFactory<any>[]
) :PromiseFactory<any> => {
    // Return a promise factory
    return () :Promise<any[]> => {
        
        // Convert array of promise factories into an array of promises
        // by invoking each factory
        let promises :Promise<any>[] = promiseFactories.map((factory) => { 
            let promise :Promise<any> = factory(); 
            return promise;
        });
        
        // Merge promises
        return Promise.all(promises);
    }
}