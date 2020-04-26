import { Repository } from 'typeorm';
import { Character, CharacterWithoutId } from '../models/character';
import { BattleSession } from '../models/battle-session';
import { Context } from '../../types';

export async function createBattleSession(ctx: Context) {
    const battleSessionRepo: Repository<BattleSession> = ctx.ports.battleSession;
    const characterRepo: Repository<Character> = ctx.ports.character;

    const sessionName: string = ctx.request.body.sessionName;
    const charactersWithoutId: CharacterWithoutId[] = ctx.request.body.characters;

    console.log(sessionName, charactersWithoutId);

    const characters = await characterRepo.save(charactersWithoutId);

    const battleSession = new BattleSession();
    battleSession.characters = characters;
    battleSession.sessionName = sessionName;

    const res = await battleSessionRepo.save(battleSession);

    return res;
}
