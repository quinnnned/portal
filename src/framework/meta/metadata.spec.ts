import {Metadata} from './metadata.shared';

describe('Metadata', () => {
   let TestClass, UnMetafiedClass;
   
   beforeAll(() => {
      //
      class _TestClass { testField :string; }
      TestClass = _TestClass;
      Metadata.Set('hasMetaKey', 'hasMetaValue', TestClass);
      Metadata.Set('hasMetaKey', 'hasMetaValue', TestClass, 'testField');
      
      //
      class _UnMetafiedClass { testField :string }
      UnMetafiedClass = _UnMetafiedClass;
   });
   
   it('should exist', () => {
      expect(Metadata).toBeDefined();
   });
   
   it('should have a setter and a getter', () => {
      expect(Metadata.Set).toBeDefined();
      expect(Metadata.Get).toBeDefined();
   });
   
   it('should set/get class metadata if only the class is provided', () => {
      expect(Metadata.Get('classMetaKey', TestClass)).not.toBeDefined();
      Metadata.Set('classMetaKey', 'classMetaValue', TestClass);
      expect(Metadata.Get('classMetaKey', TestClass)).toBe('classMetaValue');
      expect(Metadata.Get('classMetaKey', TestClass, 'testField')).not.toBeDefined();
   });
   
   it('should default to set/get field metadata if only class and fieldKey are provided', () => {
      expect(Metadata.Get('fieldMetaKey', TestClass, 'testField')).not.toBeDefined();
      Metadata.Set('fieldMetaKey', 'fieldMetaValue', TestClass, 'testField');
      expect(Metadata.Get('fieldMetaKey', TestClass, 'testField')).toBe('fieldMetaValue');
      expect(Metadata.Get('fieldMetaKey', TestClass)).not.toBeDefined();
   });
   
   it('should set/get class metadata if final parameter (forceClass) is explicitly set to true', () => {
      let forceClass = true;
      class MyClass { myField }
      expect(Metadata.Get('classMetaKey', MyClass, 'testField', forceClass)).not.toBeDefined();
      Metadata.Set('classMetaKey', 'classMetaValue', MyClass, 'testField', forceClass);
      expect(Metadata.Get('classMetaKey', MyClass, 'testField')).not.toBeDefined();
      expect(Metadata.Get('classMetaKey', MyClass, 'testField', forceClass)).toBe('classMetaValue');
   });
   
   it('has a static method to check for any metadata', () => {
      expect(Metadata.Has).toBeDefined();
   })
   
   it('can determine if a class has metadata', () => {
      expect(Metadata.Has(TestClass)).toBe(true);
      expect(Metadata.Has(UnMetafiedClass)).toBe(false);
   });
   
   it('can determine if a field has metadata', () => {
      expect(Metadata.Has(TestClass, 'testField')).toBe(true);
      expect(Metadata.Has(UnMetafiedClass, 'testField')).toBe(false);
   });
   
   it('should support metadata inheritance', () => { 
      class MyClass { myField }
      Metadata.Set('key', 'classValue', MyClass);
      Metadata.Set('key', 'fieldValue', MyClass, 'myField');
      
      class ChildClass extends MyClass {}
      
      expect(Metadata.Get('key', ChildClass)).toBe('classValue');
      expect(Metadata.Get('key', ChildClass, 'myField')).toBe('fieldValue');
   });
   
   it('can set and get array-valued metadata', () => {
      class MyClass { myField }
      Metadata.Set('key', ['a','b','c'], MyClass);
      Metadata.Set('key', ['d','e','f'], MyClass, 'myField');
      
      expect(Metadata.Get('key', MyClass)).toEqual(['a','b','c']);
      expect(Metadata.Get('key', MyClass, 'myField')).toEqual(['d','e','f']);
   });
   
    it('can overwrite existing array-valued metadata', () => {
      class MyClass { myField }
      Metadata.Set('key', ['a','b','c'], MyClass);
      Metadata.Set('key', ['d','e','f'], MyClass, 'myField');
      
      expect(Metadata.Get('key', MyClass)).toEqual(['a','b','c']);
      expect(Metadata.Get('key', MyClass, 'myField')).toEqual(['d','e','f']);
      
      Metadata.Set('key', ['h','i','j'], MyClass);
      Metadata.Set('key', ['k','l','m'], MyClass, 'myField');
      
      expect(Metadata.Get('key', MyClass)).toEqual(['h','i','j']);
      expect(Metadata.Get('key', MyClass, 'myField')).toEqual(['k','l','m']);
   });
   
   it('can set and get object-valued metadata', () => {
      class MyClass { myField }
      let a = new MyClass();
      let b = new MyClass();
      Metadata.Set('key', a, MyClass);
      Metadata.Set('key', b, MyClass, 'myField');
      
      expect(Metadata.Get('key', MyClass)).toBe(a);
      expect(Metadata.Get('key', MyClass, 'myField')).toBe(b);
   });
   
   
   it('can update existing class or field metadata', () => {
      class MyClass{ myField }
      Metadata.Set('key', 1, MyClass);
      Metadata.Set('key', 2, MyClass, 'myField');
      expect(Metadata.Get('key', MyClass)).toEqual(1);
      expect(Metadata.Get('key', MyClass, 'myField')).toEqual(2);
      
      let doubler = x => 2 * x;
      
      Metadata.Update('key', doubler, MyClass);
      Metadata.Update('key', doubler, MyClass, 'myField');
      
      expect(Metadata.Get('key', MyClass)).toEqual(2);
      expect(Metadata.Get('key', MyClass, 'myField')).toEqual(4);
   });
   
   it('should update class metadata if final parameter (forceClass) is explicitly set to true', () => {
      let forceClass = true;
      class MyClass { myField };
      Metadata.Set('classMetaKey', 2, MyClass);
      expect(Metadata.Get('classMetaKey', MyClass)).toBe(2);
      Metadata.Update('classMetaKey', x => 3 * x, MyClass, 'myField', forceClass);
      expect(Metadata.Get('classMetaKey', MyClass, 'myField')).not.toBeDefined();
      expect(Metadata.Get('classMetaKey', MyClass)).toBe(6);
   });
   
   
   
   
});