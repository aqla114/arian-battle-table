import * as Router from 'koa-router';
import { getBattleSession } from './api/get-battle-session';
import { updateBattleSession } from './api/update-battle-session';
import { createBattleSession } from './api/creare-battle-session';

export function mkRouter(router: Router): Router {
    router.get('/:id', (ctx, next) => {
        console.log(ctx.url);
        ctx.status = 200;
        ctx.render('index');

        ctx.id = ctx.params['id'];

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
        console.log('create');
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
