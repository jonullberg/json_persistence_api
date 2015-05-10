'use strict';

var bodyparser = require('body-parser');
var Quote = require('../model/Quote');


module.exports = function(router) {
	router.use(bodyparser.json());

	router.post('/quotes', function(req, res) {
		var newQuote = new Quote();
		console.log(req.body);
		newQuote.writer = req.body.writer;
		newQuote.source = req.body.source;
		newQuote.quoteBody = req.body.quoteBody;
		console.log(newQuote);
		newQuote.save(function(err, data) {
			if(err) {
				console.log(err);
				return res.status(500).json({msg: 'internal server error'});
			}
		});
	res.json(newQuote);
	});

	router.get('/quotes', function(req, res) {
		Quote.find({}, function(err, data) {
			if(err) {
				console.log(err);
				return res.status(500).json({msg: 'internal server error'});
			}
			res.json(data);
		});
	});

	router.put('/quotes/:id', function(req, res) {
		var updatedQuote = req.body;
		delete updatedQuote._id;

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