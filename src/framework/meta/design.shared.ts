import {Metadata}   from   './metadata.shared';
import {Decoration} from './decoration.shared';

export class Design {
    public static Track = Decoration.DoNothing;
    
    public static PropertyType(cls, propertyKey :string) :any {
        return Metadata.Get('design:type', cls, propertyKey);
    }
    
    public static ReturnType(cls, propertyKey :string) :any {
        return Metadata.Get('design:returntype', cls, propertyKey);
    }
    
    public static ParameterTypes(cls, propertyKey? :string) :any[] {
        return Metadata.Get('design:paramtypes', cls, propertyKey);
    }
}