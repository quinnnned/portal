import * as mongodb from 'mongodb';
import * as es6Promise from 'es6-promise';

let MongoClient = mongodb.MongoClient;
let ObjectID = mongodb.ObjectID;
let Promise = es6Promise.Promise;

export interface Persister {
    connect (uri   : string)                               : Promise;
    create  (group : string, object : any)                 : Promise;
    read    (group : string, id : string)                  : Promise;
    update  (group : string, id : string, changes : any)   : Promise;
    delete  (group : string, id : string)                  : Promise;
    search  (group : string, query : any)                  : Promise;
}

let DatabaseLogger = function(target, method, descriptor) {
    let originalValue = descriptor.value;
    descriptor.value = function(...args:any[]){
        console.log('>> Mongodb call: '+method);
        return originalValue.apply(this, args);
    }
    return descriptor;
}

export class MongoDbPersister {
    
    private connection;
    
    public connect(uri : string) : Promise {
        return new Promise((resolve, reject) => {
            MongoClient.connect(uri, (err, connection) => {
                if (err) return reject(err);
                console.log("Connected correctly to server.");
                this.connection = connection;
                return resolve();
                
                connection.collection('users').find({}).each(function(err, collections) {
                    console.log(collections);
                    
                });
            });
        })
    }
    
    @DatabaseLogger
    public create(group : string, object : any) : Promise {
        return this.promisify( (resolve, reject) => {
            this.connection.collection(group).insert(object, (err, result) => {
                if (err) return reject(err);
                let id = result.insertedIds[0].toHexString();
                resolve(id);
            });    
        });
    }
    
    @DatabaseLogger
    public read(group : string, id : string) : Promise {
        return this.promisify( (resolve, reject) => {
            let cursor = this.connection.collection(group).find({
                _id : new ObjectID(id)
            }).limit(1);
            cursor.count((err, count)=>{
                if (err) return reject(err);
                if (!count) return resolve(null);
                cursor.each((err, object)=>{
                    if (err) return reject(err);
                    return resolve(object);
                })
            });
        });
    }
    
    @DatabaseLogger
    public update(group : string, id : string, changes : any) : Promise {
        return new Promise((resolve, reject) => {
           if (this.connectionNotValid()) return reject(this.noConnectionError());
        });
    }
    
    @DatabaseLogger
    public delete(group : string, id : string) : Promise {
        return new Promise((resolve, reject) => {
           if (this.connectionNotValid()) return reject(this.noConnectionError());
        });
    }
    
    @DatabaseLogger
    public search(group : string, query : any) : Promise {
        return new Promise((resolve, reject) => {
            if (this.connectionNotValid()) return reject(this.noConnectionError());
        });
    }
    
    private promisify(callback) {
        return new Promise((resolve, reject) => {
            if (this.connectionNotValid()) return reject(this.noConnectionError());
            callback(resolve, reject);
        });
    }
    
    private connectionNotValid() : Boolean {
        return !this.connection;
    }
    
    private noConnectionError() : String {
        return 'Not connected to mongodb';
    }
    
}

