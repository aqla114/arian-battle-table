import * as Router from 'koa-router';
import { getBattleSession } from './api/get-battle-session';
import { updateBattleSession } from './api/update-battle-session';

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
        console.log(ctx.request.body);

        const battleSession = await updateBattleSession(ctx);
        ctx.status = 200;
        ctx.body = battleSession;

        return next();
    });

    return router;
}
