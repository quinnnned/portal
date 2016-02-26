import { MetaValue } from './meta-value.shared';

export class MetaSet extends MetaValue {
    
    public static GetUpdater(value: any) :Function {
        return currentSet => {
            if (!currentSet) return [value];
            let currentIndex = currentSet.indexOf(value);
            let alreadyHasValue = !(-1 === currentIndex);
            if (alreadyHasValue) return currentSet;
            currentSet.push(value);
            return currentSet;
        }   
    }
    
    public add(value, cls :Function, fieldKey? :string) :void {
        this.meta.update(
            this.key, 
            MetaSet.GetUpdater(value), 
            cls, 
            fieldKey
        );
    }
    
    public get(cls :Function, fieldKey? :string) :any {
        return super.get(cls, fieldKey) || [];
    }
    
    // public decorate(value :any) {
    //   return this.meta.decorateUpdate(this.key, MetaSet.GetUpdater(value));
    // }
}