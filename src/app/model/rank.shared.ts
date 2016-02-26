import {Schema} from '../../framework/index.shared';
import {Game}   from                './game.shared';
import {User}   from                './user.shared';

@Schema.Table('Ranks')
export class Rank {
    public weight :number;
    
    //@User.Prefers
    public preferer: User; 
}