import {Gremlin} from '../../utils/gremlin-client.server'
import {Promise} from       '../../utils/promises.server'

export class GremlinConnection {
    
    private client;
    
    constructor(host:String, port:Number) {
        // Note the reversal of port/host order
        this.client = Gremlin.createClient(port, host);
    }
    
    // Promise-ified query execution
    public execute(query: String, boundParameters?: Object) {
        //console.log(`Running: '${query}' with parameters ${JSON.stringify(boundParameters)}`);
        return new Promise((resolve, reject) => {
            this.client.execute(query, boundParameters, (error, results) => {
                if (error) return reject(new Error(error));
                resolve(results);
            })
        });
    }
}