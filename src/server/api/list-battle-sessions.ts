import { Repository } from 'typeorm';
import { BattleSession } from '../models/battle-session';
import { Context } from '../types';

export async function listBattleSessions(ctx: Context) {
    const battleSessionRepo: Repository<BattleSession> = ctx.ports.battleSession;

    const battleSessions = await battleSessionRepo.find();

    return battleSessions;
}
