// NOTE: This is really more of an integration test... 
//       but I'm having too much fun to go back and use mocks....

import { SchemaDecorators } from './schema-decorators.shared';
import { Metadata } from '../meta/metadata.shared';
import { MetaSystem } from '../meta/meta-system.shared';
import { ShipBuilder } from './ship-builder.shared';
describe('ShipBuilder', () => {
    
    it('should exist', () => {
       expect(ShipBuilder).toBeDefined();
    });
   
    it('can define a 1-1 symmetric relationship', () => {
        Schema = new SchemaDecorators(new MetaSystem('test')); 
        let sb = new ShipBuilder(Schema.ship);
        let A = sb;
        
        class Person { public spouse; }
        Schema.A.a(Person).has.one('spouse'); // monogamy assumed
        
        let rel = Schema.GetRelationship(Person,'spouse')
        expect(rel.parent.class).toBe(Person);
        expect(rel.parent.field).toBe('spouse');
        expect(rel.parent.isOne).toBe(true);
        expect(rel.child.class).toBe(Person);
        expect(rel.child.field).toBe('spouse');
        expect(rel.child.isOne).toBe(true);
        expect(rel.isHomogeneous).toBe(true);
        expect(rel.isSymmetric).toBe(true);
    });
    
    it('can define a *-* symmetric relationship', () => {
        class Person { public friends; }
        A(Person).has.many('friends');
        
        let rel = Schema.GetRelationship(Person,'friends');
        expect(rel.parent.class).toBe(Person);
        expect(rel.parent.field).toBe('friends');
        expect(rel.parent.isOne).toBe(false);
        expect(rel.child.class).toBe(Person);
        expect(rel.child.field).toBe('friends');
        expect(rel.getchild.isOne).toBe(false);
        expect(rel.isHomogeneous).toBe(true);
        expect(rel.isSymmetric).toBe(true);
    });
    
    it('can define a 1-1 homogeneous asymmetric relationship', () => {
        class Month {
        	public nextMonth;
        	public lastMonth;
        }
        A(Month).has.one('nextMonth').and.one('lastMonth');
        
        let rel = Schema.GetRelationship(Month, 'nextMonth');
        expect(rel).toBe(Schema.GetRelationship(Month, 'lastMonth'));
        expect(rel.parent.class).toBe(Month);
        expect(rel.parent.field).toBe('nextMonth');
        expect(rel.parent.isOne).toBe(true);
        expect(rel.child.class).toBe(Month);
        expect(rel.child.field).toBe('lastMonth');
        expect(rel.getchild.isOne).toBe(true);
        expect(rel.isHomogeneous).toBe(true);
        expect(rel.isSymmetric).toBe(false);
    });
    
    it('can define a *-* homogeneous asymmetric relationship', () => {
        class User {
            public following;
        	public followers;
        }
        A(User).has.many('following').and.many('followers');
        
        let rel = Schema.GetRelationship(User, 'followers');
        expect(rel).toBe(Schema.GetRelationship(User, 'following'));
        expect(rel.parent.class).toBe(User);
        expect(rel.parent.field).toBe('following');
        expect(rel.parent.isOne).toBe(false);
        expect(rel.child.class).toBe(User);
        expect(rel.child.field).toBe('followers');
        expect(rel.getchild.isOne).toBe(false);
        expect(rel.isHomogeneous).toBe(true);
        expect(rel.isSymmetric).toBe(false);
    });
    
    it('can define a 1-* homogeneous asymmetric relationship', () => {
        class Person {
            public employer;
        	public employees;
        }
        A(Person).has.one('employer').and.many('employees');
        
        let rel = Schema.GetRelationship(Person, 'employer');
        expect(rel).toBe(Schema.GetRelationship(Person,'employees'));
        expect(rel.parent.class).toBe(Person);
        expect(rel.parent.field).toBe('employer');
        expect(rel.parent.isOne).toBe(true);
        expect(rel.child.class).toBe(Person);
        expect(rel.child.field).toBe('employees');
        expect(rel.getchild.isOne).toBe(false);
        expect(rel.isHomogeneous).toBe(true);
        expect(rel.isSymmetric).toBe(false);
    });
    
    it('can define a 1-1 heterogeneous relationship', () => {
        class Employee { public desk;     }
        class Desk     { public occupant; }
        An(Employee).has.one('desk').and.a(Desk).has.one('occupant');
        
        let rel = Schema.GetRelationship(Employee, 'desk');
        expect(rel).toBe(Schema.GetRelationship(Desk,'occupant'));
        expect(rel.parent.class).toBe(Employee);
        expect(rel.parent.field).toBe('desk');
        expect(rel.parent.isOne).toBe(true);
        expect(rel.child.class).toBe(Desk);
        expect(rel.child.field).toBe('occupant');
        expect(rel.getchild.isOne).toBe(true);
        expect(rel.isHomogeneous).toBe(false);
        expect(rel.isSymmetric).toBe(false);
    });
    
    it('can define a *-* heterogeneous relationship', () => {
        class Person { public clubs;   }
        class Club   { public members; }
        A(Person).has.many('clubs').and.a(Club).has.many('member');
        
        let rel = Schema.GetRelationship(Person, 'clubs');
        expect(rel).toBe(Schema.GetRelationship(Club, 'members'));
        expect(rel.parent.class).toBe(Person);
        expect(rel.parent.field).toBe('clubs');
        expect(rel.parent.isOne).toBe(false);
        expect(rel.child.class).toBe(Club);
        expect(rel.child.field).toBe('members');
        expect(rel.getchild.isOne).toBe(false);
        expect(rel.isHomogeneous).toBe(false);
        expect(rel.isSymmetric).toBe(false);
    });
    
    it('can define a 1-* heterogeneous relationship', () => {
        
        class Post    { public comments; }
        class Comment { public post;     }
        A(Post).has.many('comments').but.a(Comment).has.one('post');
        
        let rel = Schema.GetRelationship(Post, 'comments');
        expect(rel).toBe(Schema.GetRelationship(Comment, 'post'));
        expect(rel.parent.class).toBe(Post);
        expect(rel.parent.field).toBe('comments');
        expect(rel.parent.isOne).toBe(false);
        expect(rel.child.class).toBe(Comment);
        expect(rel.child.field).toBe('post');
        expect(rel.getchild.isOne).toBe(true);
        expect(rel.isHomogeneous).toBe(false);
        expect(rel.isSymmetric).toBe(false);
    });
});