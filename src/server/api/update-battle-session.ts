import { Repository } from 'typeorm';
import { Character } from '../models/character';
import { BattleSession } from '../models/battle-session';
import { Context } from '../../types';

export async function updateBattleSession(ctx: Context) {
    const battleSessionRepo: Repository<BattleSession> = ctx.ports.battleSession;
    const characterRepo: Repository<Character> = ctx.ports.character;

    const req = ctx.request.body;

    if (!req) {
        console.error('Bad request.');
        return;
    }

    const sessionId: string = (ctx as any).params['id'];

    const battleSession = await battleSessionRepo.findOne({
        where: { id: sessionId },
        relations: ['characters'],
    });

    if (!battleSession) {
        console.error('The battle session is not found.');
        return;
    }

    const characters: Character[] = req.map((character: any) => ({
        ...character,
        overwhelmed: character.badStatus.overwhelmed,
        slipped: character.badStatus.slipped,
        abstracted: character.badStatus.abstracted,
        frenzied: character.badStatus.frenzied,
        stunned: character.badStatus.stunned,
        knockback: character.badStatus.knockback,
        poisoned: character.badStatus.poisoned,
    }));

    await characterRepo.save(characters);

    battleSession.characters = characters;

    const res = await battleSessionRepo.save(battleSession);

    return res;
}
