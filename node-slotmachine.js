/**
 * Main js
 */

var http = require('http'),
fs = require('fs');

const express=require('express');
const app = express();
const port = 8000;

var path = require('path');


// app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/templates/index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// fs.readFile('./templates/index.html', function (err, html) {
//     if (err) {
//         throw err; 
//     }       
//     http.createServer(function(request, response) {  
//         response.writeHeader(200, {"Content-Type": "text/html"});  
//         response.write(html);  
//         response.end();  
//     }).listen(8000);
// });