const Server = require('./lib/server').server;
const log = console.log;

const app = new Server();
app.create((url, res) => {
    if(url == '/'){
        res.end(`
        <h1>Halaman Index</h1>
        `);
    }else res.end('404 Page Not Found');
});