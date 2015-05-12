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
		after(function(done) {
			var fileArr = fs.readdirSync(dir);
			fs.unlink(dir + fileArr[fileArr.length - 1], function() {
				done();
			});
		});
	});
	describe('The GET request', function() {
		it('Should be able to get a quote', function(done) {
			chai.request('localhost:3000')
				.get('/api/quotes')
				.end(function(err, res) {
					expect(err).to.equal(null);
					done();
				});
		});
	});
	describe('The PUT and DELETE requests', function() {
		beforeEach(function(done) {			
			fs.writeFile(dir + '1000.json', {writer: 'Testy', source: 'a test', quoteBody: 'Testy mctesterson'});
			done();
		});

		describe('The PUT request', function() {
			it('should be able to update a quote', function(done) {
				chai.request('localhost:3000')
					.put('/api/quotes/1000')
					.send({writer: 'Updaty', source:'updating a quote', quoteBody: 'Update mcupdaterson'})
					.end(function(err, res) {
						expect(err).to.equal(null);
						expect(res.body.msg).to.equal('success');
						done();
					});
			});
			after(function(done) {
				fs.unlinkSync(dir + '1000.json');
				done();
			});
		});

		describe('The DELETE request', function() {
			it('should be able to delte a quote', function(done) {
				chai.request('localhost:3000')
					.delete('/api/quotes/1000')
					.end(function(err, res) {
						expect(err).to.equal(null);
						expect(res.body.msg).to.equal('success');
						done();
					});
			});
		});
	});
});