import { Schema } from '../../framework/index.shared';

@Schema.Table('users')
export class User {
    
    @Schema.Field
    public firstName :string;
    
    @Schema.Field
    public lastName :string;
    
    @Schema.Field
    public facebookId :string;
   
    get fullName() :string {
        return `${this.firstName} ${this.lastName}`;
    }
    
    set fullName( fullName :string) {
        let nameParts  = fullName.split(' ');
        this.firstName = nameParts.shift();
        this.lastName  = nameParts.pop(); 
    }
    
    @Schema.Relationship
    public suggestions;
    
    @Schema.Relationship
    public rankings;
}