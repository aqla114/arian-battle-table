import { Repository } from 'typeorm';
import { BattleSession } from '../models/battle-session';
import { Context } from '../../types';

export async function getBattleSession(ctx: Context, id: number) {
    const battleSessionRepo: Repository<BattleSession> = ctx.ports.battleSession;

    const battleSession = await battleSessionRepo.findOne({
        where: { id: id },
        relations: ['characters'],
    });

    let response = null;

    if (battleSession !== undefined) {
        const characters = battleSession.characters.map(character => ({
            ...character,
            badStatus: {
                overwhelmed: character.overwhelmed,
                slipped: character.slipped,
                abstracted: character.abstracted,
                frenzied: character.frenzied,
                stunned: character.stunned,
                knockback: character.knockback,
            },
        }));

        response = {
            ...battleSession,
            characters: characters,
        };
    }

    return response;
}
