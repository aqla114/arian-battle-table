import * as Router from 'koa-router';
import { listBattleSession } from './api/list-battle-session';
import { getBattleSession } from './api/get-battle-session';
import { updateBattleSession } from './api/update-battle-session';
import { createBattleSession } from './api/creare-battle-session';

export function mkRouter(router: Router): Router {
    router.get('/', (ctx, next) => {
        ctx.status = 303;
        ctx.redirect('/list-battles');

        return next();
    });

    router.get('/list-battles', (ctx, next) => {
        console.log(ctx.url);
        ctx.status = 200;
        ctx.render('index');

        return next();
    });

    router.get('/battle/:id', (ctx, next) => {
        ctx.id = ctx.params['id'];
        ctx.status = 200;
        ctx.render('index', {
            header: {
                mountedPath: '/',
            },
        });

        return next();
    });

    router.get('/api/list', async (ctx, next) => {
        const battleSessions = await listBattleSession(ctx);

        if (battleSessions) {
            ctx.body = battleSessions;
            ctx.status = 200;
        } else {
            ctx.status = 404;
        }

        return next();
    });

    router.get('/api/:id/get', async (ctx, next) => {
        const battleSession = await getBattleSession(ctx, ctx.params['id']);

        if (battleSession) {
            ctx.body = battleSession.characters;
            ctx.status = 200;
        } else {
            ctx.status = 404;
        }

        return next();
    });

    router.post('/api/:id/update', async (ctx, next) => {
        console.log('update');
        console.log(ctx.request.body);

        const battleSession = await updateBattleSession(ctx);

        if (!battleSession) {
            ctx.status = 404;
        } else {
            ctx.status = 200;
            ctx.body = battleSession;
        }

        return next();
    });

    router.post('/api/create', async (ctx, next) => {
        console.log('/create');
        console.log(ctx.request.body);

        const battleSession = await createBattleSession(ctx);

        if (!battleSession) {
            ctx.status = 500;
        } else {
            ctx.status = 200;
            ctx.body = battleSession;
        }

        return next();
    });

    return router;
}
