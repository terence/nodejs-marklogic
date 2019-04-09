var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
//  res.send("Index Page");
	res.render('index', { title: 'Express' });

});



// About
router.get('/about', function(req, res, next) {
//	res.send("About this site");
	res.render('about', { title: 'Express' });
});




module.exports = router;
