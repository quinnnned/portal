import './reflect.shared';

export class Decoration {
    
    public static DoNothing(target, propertyKey?, descriptor?) :any {}
    
    public static Compose(decorators :(ClassDecorator | PropertyDecorator | MethodDecorator)[]) {
        return (target, propertyKey?, descriptor?) :any => {
            let result = Reflect.decorate(decorators, target, propertyKey, descriptor);
            if (result) return result;
            return;
        };
    }
    
    public static Metadata(key :string, value :string) {
        return (target :Object, propertyKey? :string|symbol) => {
            Reflect.decorate([
                Reflect.metadata(key, value)
            ], target, propertyKey);
        }
    }
}