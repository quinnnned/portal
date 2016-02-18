import {A, Schema} from '../../framework/index.shared';
import {Game}      from 'game.shared';
import {Rank}      from 'rank.shared';


@Schema.Group('Users')
export class User {
    
    static SuggestsGames = A(User).has.many('suggestions')
                      .but.a(Game).has.one('suggester');
        
    static RanksGames = A(User).has.many('rankings')
                   .but.a(Rank).has.one('ranker');
    
    firstName :string;
    
    lastName :string;
    
    facebookId :string;
   
    get fullName() :string {
        return `${this.firstName} ${this.lastName}`;
    }
    
    @User.SuggestsGames
    suggestions :Game[];
    
    @User.RanksGames
    rankings :Rank[];
}