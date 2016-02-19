import {Decoration} from './decoration.shared';
import {Metadata}   from   './metadata.shared';

describe('Decoration', () => {
    let TestClass, testInstance;
    
    beforeAll(() => {
        let CompositeDecorator = Decoration.Compose([
            Decoration.Metadata('compMetaKey1', 'compMetaVal1'),
            Decoration.Metadata('compMetaKey2', 'compMetaVal2'),
            Decoration.Metadata('compMetaKey3', 'compMetaVal3')
        ]);
        
        @Decoration.Metadata('classMetaKey', 'classMetaValue')
        @CompositeDecorator
        class DecoratedClass {
            
            @Decoration.Metadata('propMetaKey', 'propMetaValue')
            @CompositeDecorator
            public decoratedProperty :string;
            
            @Decoration.Metadata('methodMetaKey', 'methodMetaValue')
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
    
    it('has a static method for metadata decoration', () => {
        expect(Decoration.Metadata).toBeDefined();
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
});