import { Repository } from 'typeorm';
import { Character } from '../models/character';
import { BattleSession } from '../models/battle-session';
import { ParameterizedContext } from 'koa';
import * as Router from 'koa-router';

const defaultCharacters = [
    Character.mk('ジョン', 19, 90, 15, 10),
    Character.mk('kiwi', 9, 147, 20, 30),
    Character.mk('カリーナ', 36, 125, 1, 5),
    Character.mk('抹茶', 22, 91, 1, 5),
    Character.mk('太郎', 30, 107, 1, 5),
    Character.mk('パルム', 6, 161, 1, 5),
];

type Context = ParameterizedContext<any, Router.IRouterParamContext<any, {}>>;

export async function updateBattleSession(ctx: Context, sessionName: string) {
    const battleSessionRepo: Repository<BattleSession> = ctx.ports.battleSession;

    await ctx.ports.character.save(defaultCharacters);

    const battleSession = new BattleSession();
    battleSession.sessionName = sessionName;
    battleSession.characters = defaultCharacters;

    const res = await battleSessionRepo.save(battleSession);

    return res;
}
