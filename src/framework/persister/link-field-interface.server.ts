import { Field } from './field-interface.server';
import { Link } from   './link-interface.server';

export interface LinkField extends Field {
    getLink()   :Link;
    getFields() :Field[];
}