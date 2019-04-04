var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/* GET foodList. */
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



/* POST new food. */
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


module.exports = router;


