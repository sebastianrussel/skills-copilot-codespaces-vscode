// Create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var comments = [];

var server = http.createServer(function(req, res) {
    // Parse the url
    var urlObj = url.parse(req.url, true);
    var path = urlObj.pathname;
    if (path === '/') {
        fs.readFile('./index.html', function(err, data) {
            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/html'
                });
                res.end('<h1>404 Not Found</h1>');
                return;
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(data);
        });
    } else if (path === '/comments') {
        if (req.method === 'GET') {
            var json = JSON.stringify(comments);
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(json)
            });
            res.end(json);
        } else if (req.method === 'POST') {
            var data = '';
            req.on('data', function(chunk) {
                data += chunk;
            });
            req.on('end', function() {
                var comment = JSON.parse(data);
                comments.push(comment);
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify(comment));
            });
        }
    } else {
        fs.readFile('.' + path, function(err, data) {
            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/html'
                });
                res.end('<h1>404 Not Found</h1>');
                return;
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(data);
        });
    }
});
server.listen(3000);
console.log('Server running at http://localhost:3000/');