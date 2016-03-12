import { Schema } from '../../framework/index.shared';

@Schema.Table('ranks')
export class Rank {

    @Schema.Field
    public weight :number;
    
    @Schema.Relationship
    public ranker;
    
    @Schema.Relationship
    public game;
}