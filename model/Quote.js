'use strict';

var fs = require('fs');

var Quote = function(obj) {
	this.writer = obj.writer;
	this.source = obj.source;
	this.quoteBody = obj.quoteBody;

}
Quote.prototype.save = function(callback) {
	if(typeof callback === 'function') {
		callback();
	}
	var saveObj = {};
	saveObj.writer = this.writer;
	saveObj.source = this.source;
	saveObj.quoteBody = this.quoteBody;
	console.log(saveObj);
	fs.readdir('./quotes/', function(err, files) {
		// console.log('your files are ' + files);

		var id = '';
		if(files.length === undefined) {
			id = 'quote0001.json';
		} else if (files.length < 9) {
			id = 'quote000' + (files.length + 1);
		} else if (files.length < 99 /*&& files.length >= 10*/) {
			id = 'quote00' + (files.length + 1);
		} else if (files.length < 999 /*&& files.length >=100*/) {
			id = 'quote0' + (files.length + 1);
		} else {
			id = 'quote' + (files.length + 1);
		}
		var fileName = id + '.json';
		saveObj.id = id;
		console.log(saveObj);
		fs.writeFile('./quotes/' + fileName, JSON.stringify(saveObj), function(err) {
			if(err) throw err;
			console.log('You\'ve saved your quote');
		});
	});
	console.log('You saved correctly');

};
Quote.prototype.find = function() {
	console.log('You\'ve ran the find method');
};

module.exports = exports = Quote;