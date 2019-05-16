import * as Router from 'koa-router';
import { getBattleSession } from './api/get-battle-session';
import { updateBattleSession } from './api/update-battle-session';

export function mkRouter(router: Router): Router {
    router.get('/battle_table', (ctx, next) => {
        console.log(ctx.url);
        ctx.status = 200;
        ctx.render('index');

        return next();
    });

    router.get('/get/:id', async (ctx, next) => {
        const res = await getBattleSession(ctx, ctx.params['id']);

        return next();
    });

    router.get('/set', async (ctx, next) => {
        const res = await updateBattleSession(ctx, 'test_session');

        return next();
    });

    return router;
}
