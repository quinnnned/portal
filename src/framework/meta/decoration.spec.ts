import {Decoration} from './decoration.shared';
import {Metadata}   from   './metadata.shared';

describe('Decoration', () => {
    let TestClass, testInstance, DecorateMetadata;
    
    beforeAll(() => {
        let DecorateMetadata = (k, v) => {
            return Decoration.Decorate( (t, p) => {
                let c = p ? t.constructor : t;
                Metadata.Set(k, v, c, p);
            });
        }
        
        let CompositeDecorator = Decoration.Compose([
            DecorateMetadata('compMetaKey1', 'compMetaVal1'),
            DecorateMetadata('compMetaKey2', 'compMetaVal2'),
            DecorateMetadata('compMetaKey3', 'compMetaVal3')
        ]);
        
        @DecorateMetadata('classMetaKey', 'classMetaValue')
        @CompositeDecorator
        class DecoratedClass {
            
            @DecorateMetadata('propMetaKey', 'propMetaValue')
            @CompositeDecorator
            public decoratedProperty :string;
            
            @DecorateMetadata('methodMetaKey', 'methodMetaValue')
            @CompositeDecorator
            public decoratedMethod(i :number) :string { return 'foo'; }
        }
        
        // Create test objects
        TestClass = DecoratedClass;
        testInstance = new TestClass();
    });
    
    it('should exist', () => {
        expect(Decoration).toBeDefined();
    });
 
    it('can set class metadata through decoration', () => {
        expect(Metadata.Get('classMetaKey', TestClass)).toBe('classMetaValue');
    });
    
    it('can set class property metadata through decoration', () => {
        expect(Metadata.Get('propMetaKey', TestClass, 'decoratedProperty'))
            .toBe('propMetaValue');
    });
    
    it('can set class method metadata through decoration', () => {
        expect(Metadata.Get('methodMetaKey', TestClass, 'decoratedMethod'))
            .toBe('methodMetaValue');
    });
    
    it('has a static method for creating composite decorators', () => {
        expect(Decoration.Compose).toBeDefined();
    });
    
    it('can mult-set class metadata through composite decoration', () => {
        expect(Metadata.Get('compMetaKey1', TestClass)).toBe('compMetaVal1');
        expect(Metadata.Get('compMetaKey2', TestClass)).toBe('compMetaVal2');
        expect(Metadata.Get('compMetaKey3', TestClass)).toBe('compMetaVal3');
    });
    
    it('can multi-set class property metadata through composite decoration', () => {
        expect(Metadata.Get('compMetaKey1', TestClass, 'decoratedProperty'))
            .toBe('compMetaVal1');
        expect(Metadata.Get('compMetaKey2', TestClass, 'decoratedProperty'))
            .toBe('compMetaVal2');
        expect(Metadata.Get('compMetaKey3', TestClass, 'decoratedProperty'))
            .toBe('compMetaVal3');
    });
    
    it('can multi-set class method metadata through composite decoration', () => {
        expect(Metadata.Get('compMetaKey1', TestClass, 'decoratedMethod'))
            .toBe('compMetaVal1');
        expect(Metadata.Get('compMetaKey2', TestClass, 'decoratedMethod'))
            .toBe('compMetaVal2');
        expect(Metadata.Get('compMetaKey3', TestClass, 'decoratedMethod'))
            .toBe('compMetaVal3');
    });
    
    it('can define a decorator that updates existing metadata', () => {
        
    });
});