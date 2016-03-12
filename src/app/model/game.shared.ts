import { Schema } from '../../framework/index.shared';
@Schema.Table('games')
export class Game {
    
    @Schema.Field
    public name :string;
    
    @Schema.Field
    public igdb_id :string;
    
    @Schema.Field
    public keywords :string;
    
    @Schema.Field
    public cover :string;
    
    @Schema.Field
    public summary :string;
    
    @Schema.Relationship
    public suggester;
    
    @Schema.Relationship
    public rankings;
}