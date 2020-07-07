var express = require('express');
var path = require('path');

var app = express();

app.use('/app/static', express.static(path.join(__dirname, '/app/static')));

app.get(['/app/*'], function(req, res) {
    res.sendFile(path.join(__dirname + '/app/index.html'));
});

app.listen(8082, () => console.log(`React app listening at http://localhost:${8082}`))

module.exports = app;

