'use strict'; /*jshint strict:false */

var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

var quoteRoutes = express.Router();

require('./router/routes')(quoteRoutes);

app.use('/api', quoteRoutes);

app.listen(port, function() {
	console.log('Your server is running on port ' + port);
});