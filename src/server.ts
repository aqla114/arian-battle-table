import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';

const WORKDIR: string = '/workdir/dst';

http.createServer((req, res) => {
    const url = req.url || '';
    const tmp = url.split('.');
    const extention = tmp[tmp.length - 1];
    switch (extention) {
        case 'js':
            fs.readFile(path.join(WORKDIR, url), function(_err, data) {
                res.writeHead(200, { 'Content-Type': 'text/javascript' });
                res.end(data, 'utf-8');
            });
            break;
        case 'css':
            fs.readFile(path.join(WORKDIR, url), function(_err, data) {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data, 'utf-8');
            });
            break;
        case '/':
            fs.readFile(path.join(WORKDIR, 'index.html'), function(_err, data) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data, 'utf-8');
                res.end();
            });
            break;
    }
}).listen(8000);

console.log('Server running at http://localhost:8000/');
