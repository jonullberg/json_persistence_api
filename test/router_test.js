'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var Quote = require('../model/Quote');
var fs = require('fs');

chai.use(chaihttp);

require('../server');


describe('The quote app API', function() {
	var dir = ('./quotes/');
	describe('The POST request', function() {
		it('should be able to write a quote', function(done) {
			chai.request('localhost:3000')
				.post('/api/quotes')
				.send({writer: 'Michael Scott', source: 'The Office', quoteBody: 'Thats what she said'})
				.end(function(err, res) {
					expect(err).to.equal(null);
					expect(res.body.source).to.equal('The Office');
					done();
				});
		});
	});
	describe('The GET request', function() {
		it('Should be able to get a quote', function(done) {
			chai.request('localhost:3000')
				.get('./api/quotes')
				.end(function(err, res) {
					expect(err).to.equal(null);
					done();
				});
		});
	});
});