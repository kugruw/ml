const fs = require('fs');

const ext = JSON.parse(fs.readFileSync('./lib/util/mime-incomplete.json', 'utf8'));

module.exports = {
    startSession: (arr, mail, jumlahstring = 16) => {
        const karakter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 1; i++) {
            let str = '';
            for (let j = 0; j < jumlahstring; j++) {
                str += karakter.charAt(Math.floor(Math.random() * karakter.length));
            }
            arr.push({id: str, mail: mail});
            for (let m = 0; m < arr.length - 1; m++) {
                if (str == arr[m].id) {
                    arr.pop();
                    i = 0;
                }
            }
            return str;
        }
    },
    contentType: filename => {
        const fileType = filename.substring(filename.indexOf('.'), filename.length);
        for (let i = 0; i < ext.length; i++) {
            if (ext[i].extension === fileType) return ext[i].mimeType;
        }
        return 'text/html';
    },
    readFile: path => {
        if (path.includes('.') === false) path += '/index.html';
        return fs.readFileSync('./public' + path, 'utf8');
    },
    staticFileHandle: (res, p) => {
        let path = p;
        if (path.includes('.') == false) {
            if (p.charAt(p.length - 1) != '/') {
                res.writeHead(301, {
                    'Location': path + '/'
                });
                return res.end();
            } else {
                path += 'index.html';
            }
        }
        fs.readFile('./public/' + path, (err, data) => {
            if (err) return res.end('404 Page Not Found');
            res.end(data);
        });
    },
    log: console.log
};

//Inactive fn

// function postController(callback) {
//     let body = '';
//     req.on('data', chunk => {
//         body += chunk;
//     });
//     req.on('end', () => {
//         const data = qs.parse(body);
//         callback(data);
//     });
// }
