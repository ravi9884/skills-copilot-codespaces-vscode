//create webserver
var express = require('express');
var app = express();
var server = app.listen(3000, listening);
function listening(){
    console.log('listening. . .');
}
//create database
var Datastore = require('nedb');
var db = new Datastore('comments.db');
db.loadDatabase();
//set up server
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));
//post comment
app.post('/api', (request, response) => {
    console.log('I got a request!');
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    db.insert(data);
    response.json(data);
});
//get comments
app.get('/api', (request, response) => {
    db.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
});
