const http = require('http'),
    qs = require('querystring'),
    url = require('url'),
    mm = require('./util/my-module');
    port = process.env.PORT || 3000;

function Server() {
    this.create = (callback) => {
        http.createServer((req, res) => {
            const q = url.parse(req.url, true).pathname;
            const query = url.parse(req.url, true).query;
            const mimeType = mm.contentType(q);
            res.writeHead(200, {
                'Content-Type': mimeType
            });

            if(typeof callback == 'function'){
                callback(q, res);
            }else{
                res.end('ML.js');
            }
            
        }).listen(port);
        mm.log('Server running on http://localhost:' + port);
    };
}

module.exports = {server: Server};
