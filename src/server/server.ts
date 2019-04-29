import * as path from 'path';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as Pug from 'koa-pug';
import * as serve from 'koa-static';

import * as mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'mysql',
    user: 'arian',
    password: 'arian',
});

connection.query('SHOW DATABASES;', (err, res, fields) => {
    console.log(err, res, fields);
});

const WORKDIR: string = '/workdir';

const app = new Koa();
const router = new Router();

function Character(name: string, actionPriority: number, hp: number, physicalDefence: number, magicalDefence: number) {
    return { name, actionPriority, hp, physicalDefence, magicalDefence, isKnockBack: false };
}

const defaultCharacters = [
    Character('ジョン', 19, 90, 15, 10),
    Character('kiwi', 9, 147, 20, 30),
    Character('カリーナ', 36, 125, 1, 5),
    Character('抹茶', 22, 91, 1, 5),
    Character('太郎', 30, 107, 1, 5),
    Character('パルム', 6, 161, 1, 5),
];

app.use(serve(path.join(WORKDIR, 'dst')));

const pug = new Pug({
    app: app,
    viewPath: path.join(WORKDIR, 'template'),
});

pug.use(app);

app.use((ctx, next) => {
    console.log(ctx.url);
    ctx.status = 200;
    ctx.render('index');

    return next();
});

router.get('/test', (ctx, next) => {
    ctx.body = defaultCharacters;
    return next();
});

app.use(router.routes());

app.listen(8000);

console.log('Server running at http://localhost:8000/');
