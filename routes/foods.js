var express = require('express');
var router = express.Router();


/*
 * GET food listing.
 *
 * */
router.get('/', function(req, res, next) {
//  res.send('foods index');
  res.render('foods', { title: 'Food glorious food'});

});

/*
router.get('/page/:pageNo/user/:userId', function(req, res) {
  res.send(req.params);

});
*/


router.get('/insert', function(req, res, next) {
  var db = req.db;
  var q = req.q;

	const documents = [
{ uri: '/gs/aardvark.json',
content: {
name: 'aardvark',
kind: 'mammal',
desc: 'The aardvark is a medium-sized burrowing, nocturnal mammal.'
}
},
{ uri: '/gs/bluebird.json',
content: {
name: 'bluebird',
kind: 'bird',
desc: 'The bluebird is a medium-sized, mostly insectivorous bird.'
}
}
];


db.documents.write(documents).result(
function(response) {
console.log('Loaded the following documents:');
response.documents.forEach( function(document) {
console.log(' ' + document.uri);
});
},
function(error) {
console.log('error here');
console.log(JSON.stringify(error, null, 2));
}
);



});


router.get('/foodlist', function(req, res, next) {
  var db = req.db;
  var q = req.q;

  db.documents.query(
    q.where(
      q.collection('entree')
    )
  ).
  result(function(records){
    res.json(records);
  });
});







/*
 * POST new food.
 *
 * */
router.post('/addfood', function(req, res, next) {
  var db = req.db;
  var foodName = req.body.foodname;
  var foodPrice = req.body.foodprice;
  var foodPop = req.body.foodpop;

  db.documents.write({
    uri: '/menu/entree/' + foodName + '.json',
    collections: ['entree'],
    contentType: 'application/json',
    content: {
      name: foodName,
      popularity: foodPop,
      price: foodPrice
    }
  }).
  result(function(err, result){
    res.send(
      (err === null) ? {msg: ''} : {msg: err }
    );
  });
});




/*
 * POST add food.
 *
 * */
router.post('/add', function(req, res, next) {
  var db = req.db;
  var foodName = req.body.foodname;
  var foodPrice = req.body.foodprice;
  var foodPop = req.body.foodpop;

  db.documents.write({
    uri: '/menu/entree/' + foodName + '.json',
    collections: ['entree'],
    contentType: 'application/json',
    content: {
      name: foodName,
      popularity: foodPop,
      price: foodPrice
    }
  }).
  result(function(err, result){
    res.send(
      (err === null) ? {msg: ''} : {msg: err }
    );
  });
});


router.post('/added', function(req, res, next) {
  var db = req.db;
  var foodName = req.body.foodname;
  var foodPrice = req.body.foodprice;
  var foodPop = req.body.foodpop;

  db.documents.write({
    uri: '/menu/entree/' + foodName + '.json',
    collections: ['entree'],
    contentType: 'application/json',
    content: {
      name: foodName,
      popularity: foodPop,
      price: foodPrice
    }
  }).
  result(function(err, result){
    res.send(
      (err === null) ? {msg: ''} : {msg: err }
    );
  });





	console.log(req.body.title);
	console.log(req.body.description);

	res.send('Page Posted');


});




module.exports = router;


