/// <reference path="../../typings/node/node.d.ts" />
import {Game}              from './model/game.shared';
import {Rank}              from './model/rank.shared';
import {User}              from './model/user.shared';
import * as express        from 'express';
import * as path           from 'path';
import {LiveFramework}     from './bits/framework/live-framework.server';
import {Portal}            from './bits/framework/portal.server';
import {Schema}            from '../framework/index.shared';
import {GremlinConnection} from '../framework/persister/gremlin/gremlin-connection.server';
import {GremlinPersister}  from '../framework/persister/gremlin/gremlin-persister.server';
//import {Metadata} from '../framework/metadata/metadata.shared';

/*
  legal - licenses
  protect product
  
  patent idea?
  before making money, have s-corp or llc set up.
  protect self - keep company and personal stuff seperate.
*/



import {SemanticRelationshipBuilder} from '../framework/schema/semantic-relationship-builder.shared';
import {SchemaToPersister}           from '../framework/schema/schema-to-persister.server';
import {ParallelAll} from '../framework/utils/promises.server';

//let gp = new GremlinPersister(new GremlinConnection('db.realolliebee.svc.tutum.io', 8182));

// console.log('game: ' + Schema.getGroup(Game) );
// console.log('user: ' + Schema.getGroup(User) );
// console.log('rank: ' + Schema.getGroup(Rank) );

// var userE, gameE;

// var me = new User();
// me.firstName = 'Jesse';
// me.lastName = 'Robertson';

// var syd = new User();
// syd.firstName = 'Syd';

// var jesseE;

// var deprefix = function(a) {
//   if (Array.isArray(a)) return a.map(deprefix);
//   if (typeof a != 'object') return a;
//   var b = {};
//   Object.getOwnPropertyNames(a).forEach(function(prefixedKey) {
//     var key = prefixedKey.split('>').pop();
//     if (key!='_') b[key] = deprefix(a[prefixedKey]); 
//   });
//   return b;
// };


// let a = SemanticRelationshipBuilder.A;

// console.log(
//   GremlinPersister.LinkToEdgeLabel(
//     SchemaToPersister.RelationshipToLink(
//       a(User).has.many('suggestions')
//       .but.
//       a(Game).has.one('suggestor')
//     )
//   )
// );

// var w = (o) => {
//     return Object.getOwnPropertyNames(o).map((key)=>{
//        var fvp = {};
       
//        var okey = key;
//        var oval = o[key];
       
//        Object.defineProperty(fvp,'getPropertyKey',{ value: ()=>okey});
//        Object.defineProperty(fvp,'getValue',{ value: ()=>oval});
//        return fvp;
//     });
// }

// var residentEvil = new Game();
//     residentEvil.name = 'Resident Evil';
//     residentEvil.summary = 'An evil that is resident';

// var smash = new Game();
//     smash.name = 'Super Smash Brothers';
//     smash.summary = 'Just smashin some bros';


// var All = (...fs) => {
//     return ()=>{return Promise.all(fs.map(f=>f()))}
// }

// var userSuggests = SchemaToPersister.RelationshipToLink(
//     a(User).has.many('suggestions')
//     .but.
//     a(Game).has.one('suggestor')
// )

// var persister = gp;

// // Create pre-baked database actions (promise factories)
// var g = persister.factorify(); // factorify the persister
// let dropDatabase = g.drop(),
//     saveJesse    = g.persist(Schema.getGroup(User), w(me)),
//     saveRE       = g.persist(Schema.getGroup(Game), w(residentEvil)),
//     saveSmash    = g.persist(Schema.getGroup(Game), w(smash)),
//     suggest      = (user, game) => g.relate(userSuggests, user, game);   
    
// // Execute pre-baked db actions
// dropDatabase().then(ParallelAll(
//     saveJesse, 
//     saveSmash, 
//     saveRE
// )).then( persistables =>{
//     let [jesse, smash_bros, resident_evil] = persistables;
//     let suggestSmash        = suggest(jesse, smash_bros);
//     let suggestResidentEvil = suggest(jesse, resident_evil);
//     return suggestSmash().then(suggestResidentEvil)
//       .then( () => {
//     var suggest_edge_label = GremlinPersister.LinkToEdgeLabel(userSuggests); //'Users.suggestions:MANY--ONE:Game.suggester';
    
    
//     // g.V(${jesseE.getPersistenceKey()}).hasLabel('${jesseE.getPersistenceGroup()}').match(
//     var query = `
//       g.V().hasLabel('${jesse.getPersistenceGroup()}').match(
//         __.as('v').id().as('id'),
//         __.as('v').label().as('label'),
//         __.as('v').values('firstName').as('firstName'),
//         __.as('v').match(
//             __.as('v>totals').outE('_').count().as('totals>_'),
//             __.as('v>totals').outE('${suggest_edge_label}').count().as('totals>suggestions')
//         ).select('totals>_','totals>suggestions').as('relationshipCounts'),
//         __.as('v')
//           .out('${suggest_edge_label}').match(
//           __.as('v>suggestions')
//             .values('name')
//             .as('suggestions>name'),
//           __.as('v>suggestions')
//             .values('summary')
//             .as('suggestions>summary'),
//           __.as('v>suggestions').in('${suggest_edge_label}').match(
//             __.as('v>suggestions>suggester').values('firstName').as('suggestions>suggester>firstName'),
//             __.as('v>suggestions>suggester').out('${suggest_edge_label}').match(
//               __.as('v>suggestions>suggester>suggestions').values('name').as('suggestions>suggester>suggestions>name'),
//               __.as('v>suggestions>suggester>suggestions').values('summary').as('suggestions>suggester>suggestions>summary')
//             ).select('suggestions>suggester>suggestions>name','suggestions>suggester>suggestions>summary').fold().as('suggestions>suggester>suggestions')
//           ).select(
//             'suggestions>suggester>firstName', 
//             'suggestions>suggester>suggestions'
//           ).as('suggestions>suggester')
//         ).select(
//           'suggestions>name',
//           'suggestions>summary',
//           'suggestions>suggester'
//         ).fold()
//         .as('suggestions')
//       ).select('id','label','firstName','suggestions', 'relationshipCounts');
//     `;

    
//     return gp.directQuery(query).then(deprefix).then(v=>JSON.stringify(v,null,2)).then(console.log);
//   })
// })
    
// .then(saveJesse).then((e) => {
//     jesseE = e;
//     return saveRE().then((resident_evil) => {
//         return suggest(jesseE, resident_evil);
//     }).then(saveSmash).then((smash_bros) => {
//         return gp.relate(userSuggests, jesseE, smash_bros);
//     });
// }).then(g.persist(Schema.getGroup(User), w(syd)))
// //   .then((e)=>{
// //     userE = e;
// //     var residentEvil = new Game();
// //     residentEvil.name = 'Resident Evil 0';
// //     residentEvil.summary = 'An evil that is less resident';
// //     return gp.persist(Schema.getGroup(Game), w(residentEvil));
// //   })
// //   .then((e) => {
// //     return gp.relate(userSuggests, userE, e);
// //   })
// //   .then(()=>{
// //     var smash = new Game();
// //     smash.name = 'Super Smash Brothers Melee';
// //     smash.summary = 'Just melee-ing some bros';
// //     return gp.persist(Schema.getGroup(Game), w(smash));
// //   })
// //   .then((e) => {
// //     return gp.relate(userSuggests, userE, e);
// //   })
//   .then( () => {
//     var suggest_edge_label = GremlinPersister.LinkToEdgeLabel(userSuggests); //'Users.suggestions:MANY--ONE:Game.suggester';
    
    
//     // g.V(${jesseE.getPersistenceKey()}).hasLabel('${jesseE.getPersistenceGroup()}').match(
//     var query = `
//       g.V().hasLabel('${jesse.getPersistenceGroup()}').match(
//         __.as('v').id().as('id'),
//         __.as('v').label().as('label'),
//         __.as('v').values('firstName').as('firstName'),
//         __.as('v').match(
//             __.as('v>totals').outE('_').count().as('totals>_'),
//             __.as('v>totals').outE('${suggest_edge_label}').count().as('totals>suggestions')
//         ).select('totals>_','totals>suggestions').as('relationshipCounts'),
//         __.as('v')
//           .out('${suggest_edge_label}').match(
//           __.as('v>suggestions')
//             .values('name')
//             .as('suggestions>name'),
//           __.as('v>suggestions')
//             .values('summary')
//             .as('suggestions>summary'),
//           __.as('v>suggestions').in('${suggest_edge_label}').match(
//             __.as('v>suggestions>suggester').values('firstName').as('suggestions>suggester>firstName'),
//             __.as('v>suggestions>suggester').out('${suggest_edge_label}').match(
//               __.as('v>suggestions>suggester>suggestions').values('name').as('suggestions>suggester>suggestions>name'),
//               __.as('v>suggestions>suggester>suggestions').values('summary').as('suggestions>suggester>suggestions>summary')
//             ).select('suggestions>suggester>suggestions>name','suggestions>suggester>suggestions>summary').fold().as('suggestions>suggester>suggestions')
//           ).select(
//             'suggestions>suggester>firstName', 
//             'suggestions>suggester>suggestions'
//           ).as('suggestions>suggester')
//         ).select(
//           'suggestions>name',
//           'suggestions>summary',
//           'suggestions>suggester'
//         ).fold()
//         .as('suggestions')
//       ).select('id','label','firstName','suggestions', 'relationshipCounts');
//     `;

    
//     return gp.directQuery(query).then(deprefix).then(v=>JSON.stringify(v,null,2)).then(console.log);
//   })
  // .catch((error)=>{
  //   console.error(error.lineNumber,error.stack,error.fileName);
  // });
  
  
    //
    
    /*
    __.as('v.suggestions.suggester').values('lastName').as('suggestions.suggester.lastName'),
    'suggestions.suggester.lastName', 
    __.as('v').values('lastName').as('lastName'),
    */



let staticFolder = path.resolve(__dirname + '/../../client');

let app = express();

app.use(express.static(staticFolder));

app.route('/*').get(function(req, res) {
  res.sendFile(staticFolder+'/index.html');
});

let server = app.listen(process.env.PORT, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log('staticFolder: '+staticFolder);
  console.log('Server listening at http://%s:%s', host, port);
});

new LiveFramework(new Portal(server));
