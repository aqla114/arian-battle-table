import * as path from 'path';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as Pug from 'koa-pug';
import * as serve from 'koa-static';
import { createConnection } from 'typeorm';
import { Character } from './models/character';
import { BattleSet } from './models/battle-set';

function mkCharacter(
    name: string,
    actionPriority: number,
    hp: number,
    physicalDefence: number,
    magicalDefence: number,
) {
    return { name, actionPriority, hp, physicalDefence, magicalDefence, isKnockBack: false };
}

async function mkApp(): Promise<void> {
    const connection = await createConnection({
        type: 'mysql',
        charset: 'utf8mb4',
        host: 'mysql',
        username: 'arian',
        password: 'arian',
        database: 'arian_db',
        port: 3306,
        synchronize: true,
        entities: [Character, BattleSet],
    });

    const repo = connection.getRepository(Character);

    const WORKDIR: string = '/workdir';

    const app = new Koa();
    const router = new Router();

    const defaultCharacters = [
        mkCharacter('ジョン', 19, 90, 15, 10),
        mkCharacter('kiwi', 9, 147, 20, 30),
        mkCharacter('カリーナ', 36, 125, 1, 5),
        mkCharacter('抹茶', 22, 91, 1, 5),
        mkCharacter('太郎', 30, 107, 1, 5),
        mkCharacter('パルム', 6, 161, 1, 5),
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

    return;
}

mkApp().catch(e => {
    console.log(e);
});
