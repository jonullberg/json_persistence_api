'use strict';

var fs = require('fs');

var Quote = function() {};

function zeroFill( number, width ) {
  width -= number.toString().length;
  if ( width > 0 ) {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // always return a string
}

function idGetter( number, width ) {
	var id = zeroFill( number, width );
	return id;
}

Quote.prototype.save = function(callback) {
	if(typeof callback === 'function') {
		callback();
	}
	var saveObj = {};
	saveObj.writer = this.writer;
	saveObj.source = this.source;
	saveObj.quoteBody = this.quoteBody;
	saveObj.id = this.id;
	if(saveObj.id === undefined) {
		var id = '';
		fs.readdir('./quotes/', function(err, files) {
			if(files[files.length - 1] === undefined) {
				id = '0000' + '';
			} else {
				id = idGetter(parseInt(files[files.length - 1].slice(0,4), 10) + 1, 4);
			}
			var fileName = id + '.json';
			saveObj.id = id;
			fs.writeFile('./quotes/' + fileName, JSON.stringify(saveObj), function(err) {
				if(err) throw err;
				console.log('You\'ve saved your quote');
			});
		});
	}
	fs.writeFile('./quotes/' + saveObj.id + '.json', JSON.stringify(saveObj), function(err) {
		if (err) throw err;
	})
};

Quote.find = function(obj, callback) {
	var dir = './quotes/';
	var returnObj;
	fs.readFile(dir + '0000.json','utf-8', function(err, data) {
		// console.log(data);
		returnObj = data;
	});
	if (typeof callback === 'function') {
		console.log(returnObj);
		callback(returnObj);
	}
};

Quote.update = function(idObj, updateObj, callback) {
	var id = idObj._id;
	var dir = './quotes/';
	Quote.remove({_id: id});
	var updatedQuote = new Quote();
	updatedQuote.writer = updateObj.writer;
	updatedQuote.source = updateObj.source;
	updatedQuote.quoteBody = updateObj.quoteBody;
	updatedQuote.id = idObj._id;
	console.log(updatedQuote);

	updatedQuote.save(function(err) {
		if(err) throw err;
	});
	// fs.readdir(dir, function(err, files) {

	// });
	console.log('You have run the update method on a quote object');


};

Quote.remove = function(obj, callback) {
	var id = obj._id;
	fs.unlink('./quotes/' + id + '.json', function(err) {
		if(err) {
			console.log(err);
		}
	});
};


module.exports = exports = Quote;