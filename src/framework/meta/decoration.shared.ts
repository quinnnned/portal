import {Metadata} from './metadata.shared';

export class Decoration {
    public static Metadata = Metadata.Decorate;

    public static Compose(decorators :(ClassDecorator | PropertyDecorator | MethodDecorator)[]) {
        return (target, propertyKey?, descriptor?) :any => {
            let result = Metadata.DecorateMultiple(decorators, target, propertyKey, descriptor);
            if (result) return result;
            return;
        };
    }
    
    public static DoNothing(target, propertyKey?, descriptor?) :any {}
}