import {Schema} from '../../framework/index.shared';

@Schema.Group('Games')
export class Game {
    name     :string;
    igdb_id  :string;
    keywords :string;
    cover    :string;
    summary  :string;
}