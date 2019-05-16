import { Repository } from 'typeorm';
import { BattleSession } from '../models/battle-session';
import { ParameterizedContext } from 'koa';
import * as Router from 'koa-router';

type Context = ParameterizedContext<any, Router.IRouterParamContext<any, {}>>;

export async function getBattleSession(ctx: Context, id: number) {
    const battleSessionRepo: Repository<BattleSession> = ctx.ports.battleSession;

    const res = await battleSessionRepo.findOne({
        where: { id: id },
        relations: ['characters'],
    });

    if (res) {
        ctx.body = res.characters;
        ctx.status = 200;
    } else {
        ctx.status = 400;
    }

    return res;
}
