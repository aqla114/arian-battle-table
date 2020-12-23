import { Repository } from 'typeorm';
import { BattleSession } from '../models/battle-session';
import { Context } from '../types';

export async function getBattleSession(ctx: Context, id: number) {
    const battleSessionRepo: Repository<BattleSession> = ctx.ports.battleSession;

    const battleSession = await battleSessionRepo.findOne({
        where: { id: id },
        relations: ['characters', 'characters.badStatus', 'characters.skills'],
    });

    let response = null;

    if (battleSession !== undefined) {
        response = battleSession;
    }

    return response;
}
