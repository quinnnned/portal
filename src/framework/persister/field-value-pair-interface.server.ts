import { Field } from './field-interface.server';

export interface FieldValuePair extends Field {
    getValue() :string|number|boolean
}