'use strict'; /*jshint strict:false */

var bodyparser = require('body-parser');
var fs = require('fs');
var Quote = require('../model/Quote');


module.exports = function(router) {
	router.use(bodyparser.json());

	router.get('/quotes', function(req, res) {
		var dir = './quotes/';
		var returnArr = [];
		fs.readdir(dir, function(err, files) {
			if(err) throw err;
			for(var i = 0; i < files.length; i++) {
				returnArr[i] = JSON.parse(fs.readFileSync(dir + files[i], 'utf-8'));
			}
			res.send(returnArr);
			res.end();
		});
	});

	router.post('/quotes', function(req, res) {
		var newQuote = new Quote();
		newQuote.writer = req.body.writer;
		newQuote.source = req.body.source;
		newQuote.quoteBody = req.body.quoteBody;
		newQuote.save(function(err, data) {
			if(err) {
				console.log(err);
				return res.status(500).json({msg: 'internal server error'});
			}
		});
	res.json(newQuote);
	});

	router.put('/quotes/:id', function(req, res) {
		var updatedQuote = req.body;
		console.log(updatedQuote);
		Quote.update({_id: req.params.id}, updatedQuote, function(err) {
			if(err) {
				console.log(err);
				return res.status(500).json({msg: 'internal server error'});
			}
		});
		res.json({msg: 'success'});
	});

	router.delete('/quotes/:id', function(req, res) {
		Quote.remove({_id: req.params.id}, function(err) {
			if(err) {
				console.log(err);
				return res.status(500).json({msg: 'internal server error'});
			}

		});
		res.json({msg: 'success'});
	});
};