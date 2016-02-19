import {Design}   from   './design.shared';
import {Metadata} from './metadata.shared';

describe('Design Metadata Subsystem', () => {
    let TrackedClass, UntrackedClass;

    beforeAll(() => {
        
        // 
        @Design.Track
        class _TrackedClass {
            
            constructor(thing :string){}
    
            @Design.Track
            public trackedField :string;
            
            @Design.Track
            public trackedMethod(i :number) :string {
                return 'pie'
            }
        }
        TrackedClass = _TrackedClass
        
        //
        class _UntrackedClass { 
            constructor(thing :string){}
            
            public untrackedField :string;
            
            public untrackedMethod(i :number) :string {
                return 'pie'
            }
        }
        UntrackedClass = _UntrackedClass;
    });
    
    it('can enable design metadata tracking', () => {
       expect(Design.Track).toBeDefined();
       expect(Metadata.Has(TrackedClass)).toBe(true);
       expect(Metadata.Has(TrackedClass, 'trackedField')).toBe(true);
       expect(Metadata.Has(TrackedClass, 'trackedMethod')).toBe(true);
       expect(Metadata.Has(UntrackedClass)).toBe(false);
       expect(Metadata.Has(UntrackedClass, 'untrackedField')).toBe(false);
       expect(Metadata.Has(UntrackedClass, 'untrackedMethod')).toBe(false);
    });
    
    it('can read class constructor parameter types', () => {
        expect(Design.ParameterTypes).toBeDefined();
        expect(Design.ParameterTypes(TrackedClass)[0]).toBe(String);
    });
    
    it('can read class property design type', () => {
        expect(Design.PropertyType).toBeDefined();
        expect(Design.PropertyType(TrackedClass,'trackedField')).toBe(String);
        expect(Design.PropertyType(TrackedClass,'trackedMethod')).toBe(Function);
    });
    
    it('can read class method return type', () => {
        expect(Design.ReturnType).toBeDefined();
        expect(Design.ReturnType(TrackedClass,'trackedMethod')).toBe(String);
    });
    
    it('can read class method parameter types', () => {
        expect(Design.ParameterTypes).toBeDefined();
        expect(Design.ParameterTypes(TrackedClass,'trackedMethod')[0]).toBe(Number);
    });
});