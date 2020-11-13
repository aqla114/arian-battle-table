import { Middleware } from 'koa';

export const pageRenderer: Middleware = async function(ctx, next) {
    ctx.page = null;
    await next();

    switch ((ctx.status / 100) | 0) {
        case 2:
            return await ctx.render('index.pug', {
                hoge: 'hoge',
            });
        case 3:
            return;
        case 4:
            await ctx.render('4xx.pug', ctx.page);
            return;
        case 5:
            await ctx.render('5xx.pug', ctx.page);
        default:
            await ctx.render('5xx.pug', ctx.page);
    }
};
