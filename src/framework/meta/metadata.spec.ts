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
   
   it('can set and get class metadata', () => {
      expect(Metadata.Get('classMetaKey', TestClass)).not.toBeDefined();
      Metadata.Set('classMetaKey', 'classMetaValue', TestClass);
      expect(Metadata.Get('classMetaKey', TestClass)).toBe('classMetaValue');
   });
   
   it('can set and get field metadata', () => {
      expect(Metadata.Get('fieldMetaKey', TestClass, 'testField')).not.toBeDefined();
      Metadata.Set('fieldMetaKey', 'fieldMetaValue', TestClass, 'testField');
      expect(Metadata.Get('fieldMetaKey', TestClass, 'testField')).toBe('fieldMetaValue');
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
});