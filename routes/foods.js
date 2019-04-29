var express = require('express');
var router = express.Router();
//var sleep = require('sleep');

// Load Models
let Food = require('../models/food');



/* ===============================================================
 * FOOD: Add
 * - 2 functions - add, post
 * */
router.get('/add', function(req, res, next) {
//  res.send('foods index');
	res.render('foods/add', {
		title: 'Food glorious food'
	});
});


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
	}).result(
    function(response) {
      console.log('Loaded the following documents:');
      response.documents.forEach( function(document) {
        console.log(' ' + document.uri);
      });
			res.redirect('/foods/read?uri=' + response.documents[0].uri)
		
		},
    function(error) {
      console.log('error here');
      console.log(JSON.stringify(error, null, 2));
    }
  );

	console.log(req.body.name);

//	res.redirect('/foods/add');			
//	res.redirect('/foods/read?uri' +  document.uri);			

});






/* ===============================================================
 * FOOD: Dummy Inserts
 *
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

	res.send('Documents inserted');


});



/* =========================================
 * FOOD: Read Single Record
 *
 */

router.get('/read', function (req, res, next) {
  var db = req.db;
  var q = req.q;
  var query = req.query;
  console.log("Hello");

//	var uri = ['/gs/bluebird.json']
  console.log(query);
//  console.log(req);
//  console.log(req.params);
  console.log(req.query.uri);

  db.documents.read(req.query.uri)
		.result().then(function(doc) {
			doc.forEach(function(doc) {
				console.log('Cat:' + doc.category);
				console.log('Content:' + doc.content);
				console.log('Food Name:' + doc.content.name);
				console.log('Food Price:' + doc.content.price);
							//console.log(JSON.stringify(doc));

				res.render ('foods/read', {
					title: 'a static title',
					name: doc.content.name,
					price: doc.content.price,
					popularity: doc.content.popularity,
					uri: doc.uri
				});
			});
					
		console.log(doc);
    // console.log(doc.category);
		// res.send(doc);



	});

});




router.get('/edit', function (req, res, next) {
  var db = req.db;
  var q = req.q;
  var query = req.query;
  console.log("Hello Edit");

//  var uri = ['/gs/bluebird.json']
  console.log(query);
//  console.log(req);
//  console.log(req.params);
  console.log(req.query.uri);

  db.documents.read(req.query.uri)
    .result().then(function(doc) {
      doc.forEach(function(doc) {
        console.log('Cat:' + doc.category);
        console.log('Content:' + doc.content);
        console.log('Food Name:' + doc.content.name);
        console.log('Food Price:' + doc.content.price);
              //console.log(JSON.stringify(doc));

				res.render ('foods/edit', {
					title: 'a static title',
					name: doc.content.name,
					price: doc.content.price,
					popularity: doc.content.popularity,
					uri: doc.uri
				});
      });

    console.log(doc);
    //console.log(doc.category);
//    res.send(doc);



  });

});






/* ======================
 * Retrieve Dummy Doc
 *
 */

router.get('/retrieve', function (req, res, next) {

  var db = req.db;
	var q = req.q;
  var uris = ['/gs/aardvark.json', '/gs/bluebird.json']


  db.documents.read(uris).result().then(function(doc) {
    console.log(doc);
i
//    doc.forEach(function(doc) {
//			console.log('Cat:' + doc.category);
      //console.log(JSON.stringify(doc));
//    });				
					
					res.send(doc);
  });

});



/* ========================
 * FOOD: Delete a Doc
 *
 */

router.get ('/delete', function (req, res, next) {

  var db = req.db;
  var q = req.q;
  var query = req.query;
  console.log("Hello Edit");

//  var uri = ['/gs/bluebird.json']
  console.log(query);
//  console.log(req);
//  console.log(req.params);
  console.log(req.query.uri);
				

//TODO: Check permissions to delete

	db.documents.remove(req.query.uri)
//	db.documents.remove('/gs/aardvark.json')

//  Create delay for ML to delete
//  sleep(1000)
	res.redirect('/foods/list')

//	res.send('Document deleted')
});



/* ===============================================================
 * FOOD: List API
 *
 *
 */
router.get('/listapi', function(req, res, next) {
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


/* ===============================================================
 * FOOD: List
 *
 *
 */
router.get('/list', function(req, res, next) {
  var db = req.db;
  var q = req.q;

  db.documents.query(
    q.where(
      q.collection('entree')
    )
  ).
  result(function(records){
    //res.json(records);
		console.log(records)			
		res.render('foods/list', {
      title: 'All my Food',
      "blobs" : records
		});
	});
});


/* ===============================================================
 * FOOD: Search
 *
 *
 */
router.get('/search', function(req, res, next) {
  var db = req.db;
  var q = req.q;

  db.documents.query(
    q.where(
      q.collection('entree')
    )
  ).
  result(function(records){
    //res.json(records);
    res.render('foods/search', {
      title: 'Search my Food',
      "blobs" : records
    });
  });

});

















/* ===============================================================
 * FOOD: Edit Response
 *
 */
router.post('/update', function(req, res, next) {
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
  }).result(
    function(response) {
      console.log('Loaded the following documents:');
      response.documents.forEach( function(document) {
        console.log(' ' + document.uri);
      });
      res.redirect('/foods/read?uri=' + response.documents[0].uri)

    },
    function(error) {
      console.log('error here');
      console.log(JSON.stringify(error, null, 2));
    }
  );

//  console.log(req.body.title);
  console.log(req.body.description);


//  res.redirect('/foods/new');
//  res.redirect('/foods/read?uri' +  document.uri);
//  res.send('Page Posted');


});





module.exports = router;


