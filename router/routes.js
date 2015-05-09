'use strict';

var bodyparser = require('body-parser');
var Quote = require('../model/Quote');


module.exports = function(router) {
	router.use(bodyparser.json());

	router.post('/quotes', function(req, res) {
		console.log(req);

		// console.log(req.body);
		// console.log(res);
		// var newQuote = new Quote(req.body);
		// newQuote.save(function(err, data) {
		// 	if(err) {
		// 		// console.log(err);
		// 		return res.status(400).json({msg: 'server error'});
		// 	}
		// 	console.log('this worked');
		// res.end();
		// });
	});
};