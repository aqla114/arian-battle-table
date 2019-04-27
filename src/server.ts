import * as fs from 'fs';
import * as path from 'path';
import * as Koa from 'koa';
import * as serve from 'koa-static';

const WORKDIR: string = '/workdir/dst';

const app = new Koa();

app.use(async (ctx, next) => {
    const url = ctx.url || '';
    const tmp = url.split('.');
    const extention = tmp[tmp.length - 1];

    switch (extention) {
        case 'js':
            ctx.type = 'text/javascript';
            ctx.status = 200;
            ctx.body = fs.readFileSync(path.join(WORKDIR, url));
            break;
        case 'css':
            ctx.type = 'text/css';
            ctx.status = 200;
            ctx.body = fs.readFileSync(path.join(WORKDIR, url));
            break;
        case '/':
            ctx.type = 'text/html';
            ctx.status = 200;
            ctx.body = fs.readFileSync(path.join(WORKDIR, 'index.html'));

            break;
    }
});

app.listen(8000);

console.log('Server running at http://localhost:8000/');
