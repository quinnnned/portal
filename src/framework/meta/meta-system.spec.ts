import { MetaSystem } from './meta-system.shared';
import { MetaValue }  from  './meta-value.shared';
import { Metadata }   from    './metadata.shared';
import { MetaSet }    from    './meta-set.shared';

describe('MetaSystem', () => {
    
    it('should exist', () => {
       expect(MetaSystem).toBeDefined(); 
    });
    
    it('can set/get isolated, system-specific class metadata key-value pairs', () => {
        // Setup
        class MyClass {}
        let systemA = new MetaSystem('A');
        let systemB = new MetaSystem('B');
        systemA.set('metaKey','metaValueA', MyClass);
        systemB.set('metaKey','metaValueB', MyClass);
        
        // Test -- same key, different values
        expect(systemA.get('metaKey', MyClass)).toBe('metaValueA');
        expect(systemB.get('metaKey', MyClass)).toBe('metaValueB');
    });
    
    it('can set/get isolated, system-specific field metadata key-value pairs', () => {
        // Setup
        class MyClass {myField}
        let systemA = new MetaSystem('A');
        let systemB = new MetaSystem('B');
        systemA.set('metaKey','metaValueA', MyClass, 'myField');
        systemB.set('metaKey','metaValueB', MyClass, 'myField');
        
        // Test -- same key, different values
        expect(systemA.get('metaKey', MyClass, 'myField')).toBe('metaValueA');
        expect(systemB.get('metaKey', MyClass, 'myField')).toBe('metaValueB');
    });
    
    it('should set class metadata values that are only visible to that subsystem', () => {
        // Setup
        class MyClass {}
        let systemA = new MetaSystem('A');
        let systemB = new MetaSystem('B');
        systemA.set('metaKey','metaValue', MyClass);
        
        // Test -- same key, different values
        expect(systemA.get('metaKey', MyClass)).toBe('metaValue');
        expect(systemB.get('metaKey', MyClass)).not.toBeDefined();
    });
    
    it('should set field metadata values that are only visible to that subsystem', () => {
        // Setup
        class MyClass {myField}
        let systemA = new MetaSystem('A');
        let systemB = new MetaSystem('B');
        systemA.set('metaKey','metaValue', MyClass, 'myField');
        
        // Test -- same key, different values
        expect(systemA.get('metaKey', MyClass, 'myField')).toBe('metaValue');
        expect(systemB.get('metaKey', MyClass, 'myField')).not.toBeDefined();
    });
    
    it('should keep class and field metadata seperate', () => {
        // Setup
        class MyClass {myField}
        let systemA = new MetaSystem('A');
        systemA.set('metaKey','metaValueClass', MyClass);
        systemA.set('metaKey','metaValueField', MyClass, 'myField');
        
        // Test -- same key, different values
        expect(systemA.get('metaKey', MyClass)).toBe('metaValueClass');
        expect(systemA.get('metaKey', MyClass, 'myField')).toBe('metaValueField');
    });
    
    it('can set system-isolated and class/field-isolate metadata through decoration', () => {
        let systemA = new MetaSystem('A');
        let systemB = new MetaSystem('B');
        let classDecoratorA = systemA.decorateSet('metaKey', 'metaClassDecoratedA');
        let fieldDecoratorA = systemA.decorateSet('metaKey', 'metaFieldDecoratedA');
        let classDecoratorB = systemB.decorateSet('metaKey', 'metaClassDecoratedB');
        let fieldDecoratorB = systemB.decorateSet('metaKey', 'metaFieldDecoratedB');
        
        @classDecoratorA
        @classDecoratorB
        class MyClass {
            
            @fieldDecoratorA
            @fieldDecoratorB
            myField
        }
        
        // Four distinct values with the same key
        expect(systemA.get('metaKey', MyClass)).toBe('metaClassDecoratedA');
        expect(systemA.get('metaKey', MyClass, 'myField')).toBe('metaFieldDecoratedA');
        expect(systemB.get('metaKey', MyClass)).toBe('metaClassDecoratedB');
        expect(systemB.get('metaKey', MyClass, 'myField')).toBe('metaFieldDecoratedB');
    });
    
    it('should allow class/field metadata set by decoration to be manually changed', () => {
        let systemA = new MetaSystem('A');
        let classDecoratorA = systemA.decorateSet('metaKey', 'metaClassDecoratedA');
        let fieldDecoratorA = systemA.decorateSet('metaKey', 'metaFieldDecoratedA');
        
        @classDecoratorA
        class MyClass {
            
            @fieldDecoratorA
            myField
        }
        
        // Initial Check
        expect(systemA.get('metaKey', MyClass)).toBe('metaClassDecoratedA');
        expect(systemA.get('metaKey', MyClass, 'myField')).toBe('metaFieldDecoratedA');
        
        // Change Values Manually
        systemA.set('metaKey', 'manuallySetClassValue', MyClass);
        systemA.set('metaKey', 'manuallySetFieldValue', MyClass, 'myField');
        
        // Ensure that values changed
        expect(systemA.get('metaKey', MyClass)).toBe('manuallySetClassValue');
        expect(systemA.get('metaKey', MyClass, 'myField')).toBe('manuallySetFieldValue');
        
    });
    
    it('can create isolated subsystems, even with the same name', () => {
        // Setup
        class MyClass {myField}
        let systemA = new MetaSystem('A');
        let subSystemA = systemA.getSubsystem('A');
        systemA.set('metaKey','metaValueClassA', MyClass);
        systemA.set('metaKey','metaValueFieldA', MyClass, 'myField');
        subSystemA.set('metaKey','subMetaValueClassA', MyClass);
        subSystemA.set('metaKey','subMetaValueFieldA', MyClass, 'myField');
        
        // Test -- same key, different values
        expect(systemA.get('metaKey', MyClass))
            .toBe('metaValueClassA');
        expect(systemA.get('metaKey', MyClass, 'myField'))
            .toBe('metaValueFieldA');
        expect(subSystemA.get('metaKey', MyClass))
            .toBe('subMetaValueClassA');
        expect(subSystemA.get('metaKey', MyClass, 'myField'))
            .toBe('subMetaValueFieldA');
    });
    
    it('can set sub-isolated metadata through decoration', () => {
        let systemA = new MetaSystem('A');
        let subSystemA = systemA.getSubsystem('A');
        
        @systemA.decorateSet('metaKey', 'metaClassDecoratedA')
        @subSystemA.decorateSet('metaKey', 'subMetaClassDecoratedA')
        class MyClass {
            
            @systemA.decorateSet('metaKey', 'metaFieldDecoratedA')
            @subSystemA.decorateSet('metaKey', 'subMetaFieldDecoratedA')
            myField
        }
        
        // Same key, four values
        expect(systemA.get('metaKey', MyClass))
            .toBe('metaClassDecoratedA');
        expect(systemA.get('metaKey', MyClass, 'myField'))
            .toBe('metaFieldDecoratedA');
        expect(subSystemA.get('metaKey', MyClass))
            .toBe('subMetaClassDecoratedA');
        expect(subSystemA.get('metaKey', MyClass, 'myField'))
            .toBe('subMetaFieldDecoratedA');
    });
    
    it('can create MetaValues', ()=>{
        let systemA = new MetaSystem('A');
        expect(systemA.makeMetaValue).toBeDefined();
        let keyAb = systemA.makeMetaValue('b');
        expect(keyAb).toEqual(jasmine.any(MetaValue));
    });
    
    it('can read class/field metavalues set by one of its MetaValues', () => {
        let systemA = new MetaSystem('A');
        let keyAdecor    = systemA.makeMetaValue('decor');
        let keyAexplicit = systemA.makeMetaValue('explicit');
        
        // Set metadata via MetaValues
        @keyAdecor.decorate('decorClass')
        class MyClass {
            @keyAdecor.decorate('decorField')
            myField;
        }
        keyAexplicit.set('explicitClass', MyClass);
        keyAexplicit.set('explicitField', MyClass, 'myField');
        
        expect(systemA.get('decor', MyClass)).toBe('decorClass');
        expect(systemA.get('decor', MyClass, 'myField')).toBe('decorField');
        expect(systemA.get('explicit', MyClass)).toBe('explicitClass');
        expect(systemA.get('explicit', MyClass, 'myField')).toBe('explicitField');
    });
    
    it('can create a MetaSet', ()=>{
        let systemA = new MetaSystem('A');
        expect(systemA.makeMetaSet).toBeDefined();
        let keyAb = systemA.makeMetaSet('b');
        expect(keyAb).toEqual(jasmine.any(MetaSet));
    });
    
    it('can read class/field metavalues set by its MetaSet', () => {
        let systemA      = new MetaSystem('A');
        // let keyAdecor    = systemA.makeMetaSet('decor');
        let keyAexplicit = systemA.makeMetaSet('explicit');
        
        // Set metadata via MetaValues
        // @keyAdecor.decorate('decorClass')
        class MyClass {
            // @keyAdecor.decorate('decorField')
            myField;
        }
        keyAexplicit.add('explicitClass', MyClass);
        keyAexplicit.add('explicitField', MyClass, 'myField');
        
        // expect(systemA.get('decor', MyClass)).toEqual(['decorClass']);
        // expect(systemA.get('decor', MyClass, 'myField')).toEqual(['decorField']);
        expect(systemA.get('explicit', MyClass)).toEqual(['explicitClass']);
        expect(systemA.get('explicit', MyClass, 'myField')).toEqual(['explicitField']);
    });
    
    it('can update existing isolated class or field metadata', () => {
        let systemA = new MetaSystem('A');
        class MyClass{ myField }
        systemA.set('key', 1, MyClass);
        systemA.set('key', 2, MyClass, 'myField');
        expect(systemA.get('key', MyClass)).toEqual(1);
        expect(systemA.get('key', MyClass, 'myField')).toEqual(2);
      
        let doubler = x => 2 * x;
      
        systemA.update('key', doubler, MyClass);
        systemA.update('key', doubler, MyClass, 'myField');
      
        expect(systemA.get('key', MyClass)).toEqual(2);
        expect(systemA.get('key', MyClass, 'myField')).toEqual(4);
    });
    
    it('can decorate-update existing isolated class or field metadata', () => {
        let systemA = new MetaSystem('A');
        
        expect(systemA.decorateUpdate).toBeDefined();
        let DecorateSetToOne = systemA.decorateSet('key', 1);
        let DecorateSetToTwo = systemA.decorateSet('key', 2);
        let DecorateDouble = systemA.decorateUpdate('key', x => 2 * x);
        
        // NOTE: Decorators are applied from bottom to top.
        @DecorateDouble
        @DecorateDouble
        @DecorateSetToOne
        class MyClass{
            
            // NOTE: Decorators are applied from bottom to top.
            @DecorateDouble
            @DecorateDouble
            @DecorateSetToTwo
            myField 
        }
        
        expect(systemA.get('key', MyClass)).toEqual(4);
        expect(systemA.get('key', MyClass, 'myField')).toEqual(8);
    });
    
    it('can set class metadata by decorating its fields', () => {
        let systemA = new MetaSystem('A');
        let forceClassMetadata = true;
        let DecorateSetClass = systemA
            .decorateSet(
                'key', 
                'classMetaValue', 
                forceClassMetadata
            );
        
        class MyClass1{
            @DecorateSetClass
            myField 
        }
        
        @DecorateSetClass
        class MyClass2{
            myField 
        }
        
        expect(systemA.get('key', MyClass1)).toEqual('classMetaValue');
        expect(systemA.get('key', MyClass1, 'myField')).not.toBeDefined();
        
        expect(systemA.get('key', MyClass2)).toEqual('classMetaValue');
        expect(systemA.get('key', MyClass2, 'myField')).not.toBeDefined();
    });
    
    it('can update class metadata by decorating its fields', () => {
        let systemA = new MetaSystem('A');
        let forceClassMetadata = true;
        let InitFieldCountToZero = systemA.decorateSet(
            'fieldCount', 0, forceClassMetadata
        );
        let IncrementFieldCount = systemA.decorateUpdate(
            'fieldCount', x => x + 1, forceClassMetadata
        );
        
        // NOTE: Class Decorators Are Processed AFTER Field Decorators
        @InitFieldCountToZero    
        class MyBaseClass {}
        
        class MyClass extends MyBaseClass{
            
            @IncrementFieldCount
            myField1
            
            @IncrementFieldCount
            myField2
            
            @IncrementFieldCount
            myField3
        }
        
        expect(systemA.get('fieldCount', MyClass)).toEqual(3);
        expect(systemA.get('fieldCount', MyClass, 'myField1')).not.toBeDefined();
        expect(systemA.get('fieldCount', MyClass, 'myField2')).not.toBeDefined();
        expect(systemA.get('fieldCount', MyClass, 'myField3')).not.toBeDefined();
    });
});