import { SchemaDecorators }     from            './schema.shared';
import { MetaSystem }           from '../meta/meta-system.shared';

describe('SchemaDecorators', () => {
    
    it('can get and decorate-set the persistence group for a class', () => {
        let Schema = new SchemaDecorators(new MetaSystem('test')); 
        
        @Schema.Group('test_classes') 
        class TestClass {}
        
        expect(Schema.GetGroup(TestClass)).toBe('test_classes');
    });
    
    it('can get the fields of a class by decorating those fields',() => {
        let Schema = new SchemaDecorators(new MetaSystem('test')); 
        expect(Schema.Field).toBeDefined();
        expect(Schema.GetFields).toBeDefined();
        
        class TestClass {
            
            @Schema.Field
            myFieldA;
            
            @Schema.Field
            myFieldB;
            
            myNonField;
        }
        
        expect(Schema.GetFields(TestClass)).toEqual(['myFieldA', 'myFieldB']);
    });
    
    it('should not add fields to the class more than once, even if multi-decorated',() => {
        let Schema = new SchemaDecorators(new MetaSystem('test')); 
        expect(Schema.Field).toBeDefined();
        expect(Schema.GetFields).toBeDefined();
        
        class TestClass {
            
            @Schema.Field
            @Schema.Field
            @Schema.Field
            @Schema.Field
            myFieldA;
        }
        
        expect(Schema.GetFields(TestClass)).toEqual(['myFieldA']);
    });
    
    
    
    // can get and decorate-set a property relationship
    
    
    
    
});
