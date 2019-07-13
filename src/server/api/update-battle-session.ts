import { Repository } from 'typeorm';
import { Character } from '../models/character';
import { BattleSession } from '../models/battle-session';
import { Context } from '../../types';

export async function updateBattleSession(ctx: Context) {
    const battleSessionRepo: Repository<BattleSession> = ctx.ports.battleSession;
    const characterRepo: Repository<Character> = ctx.ports.character;

    const characters: Character[] = ctx.request.body;

    if (!characters) {
        console.error('Bad request.');
        return;
    }

    const battleSession = await battleSessionRepo.findOne({
        where: { id: ctx.params['id'] },
        relations: ['characters'],
    });

    if (!battleSession) {
        console.error('The battle session is not found.');
        return;
    }

    await characterRepo.save(characters);

    battleSession.characters = characters;
    battleSession.sessionName = 'test_session';

    const res = await battleSessionRepo.save(battleSession);

    return res;
}
