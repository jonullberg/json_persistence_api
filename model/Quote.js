'use strict';

var Quote = module.exports = exports = function(obj) {}
// this.obj = obj;
// console.log(obj);
Quote.prototype.id = '0001';
Quote.prototype.writer = 'Jonathan';
Quote.prototype.source = 'my brain';
Quote.prototype.quoteBody = 'YOLO';
Quote.prototype.save = function(callback) {
	this.id = id;
	this.writer = writer;
	this.source = source;
	this.quoteBody = quoteBody;
	fs.writeFile('note' + id, JSON.stringify({writer: writer, source: source, quoteBody: quoteBody}));
	// if(typeof callback === 'function') {
	// 	callback();
	// }

};
Quote.prototype.find = function() {

};