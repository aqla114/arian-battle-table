import * as path from 'path';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as serve from 'koa-static';
import * as bodyParser from 'koa-bodyparser';
import Pug from 'koa-pug';
import { createConnection } from 'typeorm';
import { Character } from './models/character';
import { BattleSession } from './models/battle-session';
import { mkRouter, CustomT, StateT } from './mk-router';
import { pathCanonicalizer } from 'koa-path-canonicalizer';

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
        entities: [Character, BattleSession],
    });

    const WORKDIR: string = '/workdir';

    const app = new Koa<StateT, CustomT>();
    const router = new Router<StateT, CustomT>();

    app.use((ctx, next) => {
        ctx.ports = {
            character: connection.manager.getRepository(Character),
            battleSession: connection.manager.getRepository(BattleSession),
        };

        return next();
    });

    app.use(pathCanonicalizer());

    app.use(
        bodyParser({
            enableTypes: ['json'],
        }),
    );

    app.use(serve(path.join(WORKDIR, 'dst')));

    const pug = new Pug({
        viewPath: path.join(WORKDIR, 'template'),
        locals: {
            mountedPath: '/',
        },
    });

    pug.use(app as any);

    app.use(mkRouter(router).routes());

    app.listen(8000);

    console.log('Server running at http://localhost:8000/');

    return;
}

mkApp().catch(e => {
    console.log(e);
});
