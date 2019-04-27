import * as path from 'path';
import * as Koa from 'koa';
import * as Pug from 'koa-pug';
import * as serve from 'koa-static';

const WORKDIR: string = '/workdir/dst';

const app = new Koa();

app.use(serve(WORKDIR));

const pug = new Pug({
    app: app,
    viewPath: path.join(WORKDIR, 'template'),
});

pug.use(app);

app.use((ctx, _) => {
    ctx.status = 200;
    ctx.render('index');
});

app.listen(8000);

console.log('Server running at http://localhost:8000/');
