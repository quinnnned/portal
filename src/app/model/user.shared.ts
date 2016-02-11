import {Schema} from '../../framework/index.shared';






@Schema.Group('Users')
export class User {
    
    @Schema.Test
    firstName       :string;
    
    @Schema.Test
    lastName        :string;
    
    @Schema.Test
    facebookId      :string;
    
    @Schema.Test
    get fullName()  :string {
        return `${this.firstName} ${this.lastName}`;
    }
    
    @Schema.Test
    public bestFriend :User
    
    @Schema.Test
    public followers :Set<User>;
    
    @Schema.Test
    public following :Set<User>;
    
    @Schema.Test
    public follow(user :User) {
        var s = new Set();
        
        console.log(s.keys());
        
        this.following.add(user);
        user.followers.add(this);
    }
    
    
}