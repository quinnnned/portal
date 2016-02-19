import {MetaSystem} from './meta-system.shared';

describe('MetaSystem', () => {
    var TestClass, metaSystem;

    beforeAll(() => {
        metaSystem = new MetaSystem('test:');
        let testDecorator = metaSystem.getDecorator('key', 'value');
    
        @testDecorator
        class BoringClass {
            
            constructor(thing :string){}
            
            @testDecorator
            public field :string;
            
            @testDecorator
            public method(i :number) :string {
                return 'pie'
            }
        }
        TestClass = BoringClass;
    });
    
    it('can set and get class metadata', () => {
        expect(metaSystem.setClassMetadata).toBeDefined();
        expect(metaSystem.getClassMetadata).toBeDefined();
        metaSystem.setClassMetadata(TestClass,'fooKey','barVal');
        expect(metaSystem.getClassMetadata(TestClass,'fooKey')).toBe('barVal');
    });
    
    it('can set and get field metadata', () => {
        let k = 'fooKey', 
            v = 'barFieldVal', 
            f = 'field',
            c = TestClass;
        expect(metaSystem.setFieldMetadata).toBeDefined();
        expect(metaSystem.getFieldMetadata).toBeDefined();
        metaSystem.setFieldMetadata(c, f, k, v);
        expect(metaSystem.getFieldMetadata(c, f, k)).toBe(v);
    });
    
    it('can generate subsystems', () => {
        expect(metaSystem.getSubsystem).toBeDefined();
        let subSystem = metaSystem.getSubsystem('subprefix:');
        expect(subSystem instanceof MetaSystem).toBe(true);
        subSystem.setClassMetadata(TestClass, 'fooKey', 'subVal');
        expect(subSystem.getClassMetadata(TestClass,'fooKey'))
            .toBe('subVal');
        subSystem.setFieldMetadata(TestClass,'field','fooKey', 'subFieldVal');
        expect(subSystem.getFieldMetadata(TestClass,'field','fooKey'))
            .toBe('subFieldVal');
    });
});