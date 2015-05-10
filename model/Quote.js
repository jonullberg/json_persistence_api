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
	var number = number;
	var width = width;
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
	fs.readdir('./quotes/', function(err, files) {
		if(files[files.length - 1] === undefined) {
			var id = '0000' + '';
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

};

Quote.find = function(obj, callback) {
	var err;
	var dir = './quotes/';
	if (obj._id === undefined) {
		var returnObj = {};
		fs.readdir(dir, function(err, files) {
			if (err) throw err;
			files.forEach(function(file) {
				fs.readFile(dir + file, 'utf-8', function(err, data) {
					returnObj.file = data;
				});
			});
			console.log(returnObj);

		});
	// } else {
	// 	fs.readFile('./quotes/' + obj._id + '.json', function(err, data) {
	// 		console.log(JSON.parse(data));
	// 		if(typeof callback === 'function') {
	// 			callback(JSON.parse(data));
	// 		}
	// 		// return JSON.parse(data);
	// 	});
		if(typeof callback === 'function') {
			callback(err, returnObj);
		}
	}
	// console.log(returnObj);
};

Quote.update = function(id, callback) {
	console.log('You have run the update method on a quote object');
};

Quote.remove = function(obj, callback) {
	console.log('You have run the remove method on a quote object');
	var id = obj._id;
	console.log(id);
	fs.unlink('./quotes/' + id + '.json', function(err) {
		if(err) {
			console.log(err);
		}
	});
};


module.exports = exports = Quote;