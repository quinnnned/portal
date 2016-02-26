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
    
    /**
     * This might be silly, but making TypeScript happy with decorators is
     * an enormous pain.
     */ 
    public static Decorate(f :Function) {
        return (target :Object, propertyKey? :string|symbol, descriptor?) :any=> {
            let result = f(target, propertyKey, descriptor);
            if (result) return result;
            return;
        }
    }
}