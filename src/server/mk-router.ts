import { listBattleSessions } from './api/list-battle-sessions';
import { getBattleSession } from './api/get-battle-session';
import { updateBattleSession } from './api/update-battle-session';
import { createBattleSession } from './api/creare-battle-session';
import { MiddleWare } from './types';
import { pageRenderer } from './page-renderer';
import { deleteBattleSession } from './api/delete-battle-session';
import { loadCharactersFromSheet } from './api/load-characters-from-sheet';

export function mkRouter(router: MiddleWare): MiddleWare {
    router.get('/', pageRenderer, (ctx, next) => {
        ctx.status = 303;
        ctx.redirect('/battle-sessions');

        return next();
    });

    router.get('/battle-sessions', pageRenderer, async (ctx, next) => {
        ctx.status = 200;

        return next();
    });

    // TODO : getBattleSession までは要らなくて存在するかどうかで場合分けしたい。
    router.get('/battle/:id', pageRenderer, async (ctx, next) => {
        const battleSession = await getBattleSession(ctx, ctx.params['id']);

        if (battleSession) {
            ctx.status = 200;
        } else {
            ctx.status = 404;
        }

        return next();
    });

    router.get('/api/list', async (ctx, next) => {
        const battleSessions = await listBattleSessions(ctx);

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
            ctx.body = battleSession;
            ctx.status = 200;
        } else {
            ctx.status = 404;
        }

        return next();
    });

    router.post('/api/:id/delete', async (ctx, next) => {
        console.log('/delete');

        await deleteBattleSession(ctx, ctx.params['id']);

        ctx.status = 200;

        return next();
    });

    router.post('/api/:id/update', async (ctx, next) => {
        console.log('/update');
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

    router.post('/api/:id/load-characters-from-sheet', async (ctx, next) => {
        console.log('/api/load-characters-from-sheet');
        console.log(ctx.request.body);

        const battleSession = await loadCharactersFromSheet(ctx);

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
