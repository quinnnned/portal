import { ClassyMetaRoot } from '../classy/classy-meta-root.shared';

import { SchemaDecorators } from './schema.shared';
export let Schema = new SchemaDecorators(ClassyMetaRoot);

import { SemanticRelationshipBuilder } from './semantic-relationship-builder.shared';
export let A = SemanticRelationshipBuilder.A;
export let An = SemanticRelationshipBuilder.A;