import {Portal} from './portal.server'
import {Persister} from './mongodb.persister.server'

export class LiveFramework {
    constructor(
        private Portal    : Portal, 
        private Persister : Persister ) {
        
        let logger = (value) => { console.log(value) }
        
        let object = {stuff:'whatever', lets:'try', something:'more', complicated:true};
        
        console.log(object);
        
        this.Persister.connect('mongodb://brash-shmoes:revlis^14@ds027483.mongolab.com:27483/brash-shmoes')
            .then(()   => { return this.Persister.create('stuff', object)})
            .then((id) => { return this.Persister.read('stuff', id); })
            .then(logger)
            .catch(logger);
    }
}

