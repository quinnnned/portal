import { ClassyMetaRoot } from  './classy-meta-root.shared';
import { MetaSystem }     from '../meta/meta-system.shared';

describe('ClassyMetaRoot', () => {
    
   it('should exist', () => {
      expect(ClassyMetaRoot).toBeDefined(); 
   });  
    
   it('should be a meta-system', () => {
       expect(ClassyMetaRoot).toEqual(jasmine.any(MetaSystem));
   }) 
});