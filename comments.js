// Create web server
// 1. Load the http module
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var comments = [];

// 2. Create an HTTP server to handle responses
http.createServer(function (req, res) {
  // 3. Parse the request containing file name
  var pathname = url.parse(req.url).pathname;
  // 4. Print the name of the file for which request is made.
  console.log("Request for " + pathname + " received.");
  // 5. Read the requested file content from file system
  fs.readFile(pathname.substr(1), function (err, data) {
    if (err) {
      console.log(err);
      // HTTP Status: 404 : NOT FOUND
      // Content Type: text/plain
      res.writeHead(404, {'Content-Type': 'text/html'});
    } else {
      // Page found
      // HTTP Status: 200 : OK
      // Content Type: text/plain
      res.writeHead(200, {'Content-Type': 'text/html'});
      // Write the content of the file to response body
      res.write(data.toString());
    }
    // Send the response body
    res.end();
  });
}).listen(8081);

console.log('Server running at http://