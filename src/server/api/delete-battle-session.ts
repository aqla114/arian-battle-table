import { Repository } from 'typeorm';
import { BattleSession } from '../models/battle-session';
import { Context } from '../../types';

export async function deleteBattleSession(ctx: Context, sessionId: number) {
    const battleSessionRepo: Repository<BattleSession> = ctx.ports.battleSession;

    await battleSessionRepo.delete({ id: sessionId });

    return;
}
