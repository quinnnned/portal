var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.send('Hello World!');
});
var gremlin = require('gremlin');
var client = gremlin.createClient(8182, 'db.realolliebee.svc.tutum.io');
var next = process.exit;  

// var query = `
//   mgmt = graph.openManagement();
//   mgmt.makeEdgeLabel('testOneToMany').multiplicity(ONE2MANY).make();
//   mgmt.commit();
//   `

//var query = `g.V().drop()`;
//var query = 'g.V().valueMap()';0

/*
  g.V().hasLabel('Users').as('v')
    .properties('lastName').value().store('lastName').select('v')
    .properties('firstName').value().store('firstName').select('v')
    .out('suggested').valueMap(true, 'name').store('suggestions').select('v')
    .cap('suggestions','lastName','firstName');
    
    
     g.V().hasLabel('Users').match(
    __.as('u').out('suggested').valueMap(true,'name').fold().as('suggestions'),
    __.as('u').properties('firstName').value().as('firstName')
  ).select('firstName', 'suggestions');
    
    
    
  g.V().hasLabel('Users').match(
    __.as('u').label().as('ulabel'),    
    __.as('u').id().as('uid'),
    __.as('u').values('firstName').as('firstName'),
    __.as('u').out('suggested').match(
      __.as('g').label().as('glabel'),
      __.as('g').id().as('gid'),
      __.as('g').values('name').as('name'),
      __.as('g').values('summary').as('summary')
    ).select('glabel','gid','name','summary').fold().as('suggestions')
  ).select('ulabel','uid','firstName', 'suggestions');
    
    
     g.V().hasLabel('Users').match(
    __.as('u').label().as('ulabel'),    
    __.as('u').id().as('uid'),
    __.as('u').values('firstName').as('firstName'),
    __.as('u').out('suggested').match(
      __.as('g').label().as('glabel'),
      __.as('g').id().as('gid'),
      __.as('g').values('name').as('name'),
      __.as('g').values('summary').as('summary'),
      __.as('g').in('suggested').match(
        __.as('uu').label().as('uu.label'),
        __.as('uu').id().as('uu.id'),
        __.as('uu').values('firstName').as('uu.firstName')
      ).select('uu.label','uu.id','uu.firstName').fold().as('suggestors')
    ).select('glabel','gid','name','summary','suggestors').fold().as('suggestions')
  ).select('ulabel','uid','firstName', 'suggestions');
    
    
   g.V().hasLabel('Users').match(
    __.as('u').values('firstName').as('firstName'),
    or(
      __.as('u').values('lastName').as('lastName'),
      __.as('u').constant('').as('lastName')
    ),
    __.as('u').out('suggested').match(
      __.as('g').values('name').as('name'),
      __.as('g').values('summary').as('summary'),
      __.as('g').in('suggested').match(
        __.as('uu').values('firstName').as('uu.firstName'),
      ).select('uu.firstName').fold().as('suggestors')
    ).select('name','summary','suggestors').fold().as('suggestions')
  ).select('firstName','lastName', 'suggestions');
    
*/


//.properties('firstName').as('firstName').select('v')
var query = `
  g.V().hasLabel('Users').match(
    __.as('v').values('firstName').as('v.firstName'),
    __.as('v').values('lastName').as('v.lastName'),
    __.as('v').out('suggested').match(
      __.as('g').values('name').as('name'),
      __.as('g').values('summary').as('summary'),
      __.as('g').in('suggested').match(
        __.as('uu').values('firstName').as('uu.firstName'),
        __.as('uu').values('lastName').as('uu.lastName'),
        __.as('uu').out('suggested').match(
          __.as('gg').values('name').as('gg.name'),
          __.as('gg').values('summary').as('gg.summary'),
        ).select('gg.name','gg.summary').fold().as('uu.suggestions')
      ).select('uu.firstName', 'uu.lastName', 'uu.suggestions').as('suggester')
    ).select('name','summary','suggester').fold().as('v.suggestions')
  ).select('v.firstName','v.lastName', 'v.suggestions').as('result');
`;

//var query = `g.V().has('firstName').choose(true, __.constant('right'), __.constant('left'))`
//__.as('uu').values('lastName').as('uu.lastName')
/*
__.as('u').choose(__.has('lastname'), __.constant('woods'), __.values('lastName')).as('lastName'),
__.as('uu').label().as('uulabel'),
        __.as('uu').id().as('uuid'),

'id','label',


__.as('u').label().as('label'),    





// */


// var querySkeleton = [
//   { displayKey:'firstName', defaultValue: 'FIRSTNAME' },
//   { displayKey:'lastName', defaultValue: 'LASTNAME' },
// ]

// var skeletonToMatchClause = function(skel) {
//   return `.match(${skel.map})`;
// };


var deprefix = function(a) {
  if (Array.isArray(a)) return a.map(deprefix);
  if (typeof a != 'object') return a;
  var b = {};
  Object.getOwnPropertyNames(a).forEach(function(prefixedKey) {
    var key = prefixedKey.split('.').pop();
    b[key] = deprefix(a[prefixedKey]);
  });
  return b;
};


//var query = `g.V(335920).property('lastName','Schorsacks').property('firstName','Syd')`;

//var query = `g.V().hasLabel('Users').valueMap()`
client.execute(query, function(err, results) {
    err && console.error(err);
    results && console.log(JSON.stringify({
      query:query,
      count:results.length,
      results:results.map(deprefix)
    }));
    next();
});





var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
});                                            