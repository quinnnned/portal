import { MetaSystem } from './meta-system.shared';
import { MetaValue }  from  './meta-value.shared';

describe('MetaValue', () => {
   it('should exist', () => {
       expect(MetaValue).toBeDefined();
   });
   
   it('can get and explicit-set class/field metadata values for a given key', () => {
       
       let systemA = new MetaSystem('A');
       let keyAb = new MetaValue('b', systemA);
       
       class MyClass { myField }
       
       
       expect(keyAb.set).toBeDefined();
       expect(keyAb.get).toBeDefined();
       
       expect(keyAb.get(MyClass)).not.toBeDefined();
       expect(keyAb.get(MyClass, 'myField')).not.toBeDefined();
       
       keyAb.set('AbClassValue', MyClass);
       keyAb.set('AbFieldValue', MyClass, 'myField');
       
       expect(keyAb.get(MyClass)).toBe('AbClassValue');
       expect(keyAb.get(MyClass, 'myField')).toBe('AbFieldValue');
   });
   
   it('can decorate-set class/field metadata values', () => {
       let systemA = new MetaSystem('A');
       let keyAb = new MetaValue('b', systemA);
       
       expect(keyAb.decorate).toBeDefined();
       
       @keyAb.decorate('AbClassValue')
       class MyClass { 
           
           @keyAb.decorate('AbFieldValue')
           myField 
       }
       
       expect(keyAb.get(MyClass)).toBe('AbClassValue');
       expect(keyAb.get(MyClass, 'myField')).toBe('AbFieldValue');
   });
});