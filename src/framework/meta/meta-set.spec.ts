import { MetaSystem } from './meta-system.shared';
import { MetaValue }  from  './meta-value.shared';
import { Metadata }  from    './metadata.shared';
import { MetaSet }    from    './meta-set.shared';

describe('MetaSet', () => {
    
    it('should exist', () => {
       expect(MetaSet).toBeDefined();
    });
   
    it('should be a MetaValue', () => {
        let system = new MetaSystem('test');
        expect(new MetaSet('foo', system)).toEqual(jasmine.any(MetaValue))
    });
    
    it('should always return an array', ()=> {
        let system  = new MetaSystem('test');
        let metaSet = new MetaSet('test', system);
        class MyClass {}
        
        expect(metaSet.get).toBeDefined();
        expect(metaSet.get(MyClass)).toEqual(jasmine.any(Array));
    });
    
    it('can add multiple values to a key and get values as an array', () => {
        let system  = new MetaSystem('test');
        let metaSet = new MetaSet('testMetaSet', system);
        class MyClass {myField}
        
        expect(metaSet.add).toBeDefined();
        
        metaSet.add('classValue1', MyClass);
        metaSet.add('classValue2', MyClass);
        metaSet.add('fieldValue1', MyClass, 'myField');
        metaSet.add('fieldValue2', MyClass, 'myField');
        
        expect(metaSet.get(MyClass)).toEqual(['classValue1', 'classValue2']);
        expect(metaSet.get(MyClass, 'myField')).toEqual(['fieldValue1', 'fieldValue2']);
    });
    
    it('should enforce indexof-like uniqueness', () => {
        let system  = new MetaSystem('test');
        let metaSet = new MetaSet('testMetaSet', system);
        class MyClass {myField}
        
        expect(metaSet.add).toBeDefined();
        expect(metaSet.get(MyClass)).toEqual([]);
        expect(metaSet.get(MyClass, 'myField')).toEqual([]);
        
        metaSet.add('classValue', MyClass);
        metaSet.add('classValue', MyClass);
        metaSet.add('classValue', MyClass);
        metaSet.add('classValue', MyClass);
        metaSet.add('fieldValue', MyClass, 'myField');
        metaSet.add('fieldValue', MyClass, 'myField');
        metaSet.add('fieldValue', MyClass, 'myField');
        metaSet.add('fieldValue', MyClass, 'myField');
        
        expect(metaSet.get(MyClass)).toEqual(['classValue']);
        expect(metaSet.get(MyClass, 'myField')).toEqual(['fieldValue']);
    });
    
    // // NOTE: I'M BEGINING TO THINK THAT DECORATION AND METADATA SHOULD BE KEPT SEPERATE...
    
    
    // it('can decorate-set multiple values and retrieve as array', () => {
    //     let system  = new MetaSystem('test');
    //     let metaSet = new MetaSet('testMetaSet', system);
        
    //     expect(metaSet.decorate).toBeDefined();
        
    //     @metaSet.decorate('classValue1')
    //     @metaSet.decorate('classValue2')
    //     class MyClass {
    //         @metaSet.decorate('fieldValue1')
    //         @metaSet.decorate('fieldValue2')    
    //         myField
    //     }
        
    //     expect(metaSet.get(MyClass)).toContain('classValue1');
    //     expect(metaSet.get(MyClass)).toContain('classValue2');
    //     expect(metaSet.get(MyClass, 'myField')).toContain('fieldValue1');
    //     expect(metaSet.get(MyClass, 'myField')).toContain('fieldValue2');
    // })
});