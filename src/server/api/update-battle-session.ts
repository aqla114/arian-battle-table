import { Repository } from 'typeorm';
import { Character } from '../models/character';
import { BattleSession } from '../models/battle-session';
import { Context } from '../../types';

export async function updateBattleSession(ctx: Context) {
    const battleSessionRepo: Repository<BattleSession> = ctx.ports.battleSession;

    const req = ctx.request.body;

    if (!req) {
        console.error('Bad request.');
        return;
    }

    const sessionId: string = (ctx as any).params['id'];

    const battleSession = await battleSessionRepo.findOne({
        where: { id: sessionId },
        relations: ['characters', 'characters.badStatus', 'characters.skills'],
    });

    if (!battleSession) {
        console.error('The battle session is not found.');
        return;
    }

    const { sessionName, characters }: { sessionName: string; characters: Character[] } = req;

    battleSession.sessionName = sessionName;
    battleSession.characters = characters;

    const res = await battleSessionRepo.save(battleSession);

    return res;
}
