import { Repository } from 'typeorm';
import { Character, CharacterWithoutId } from '../models/character';
import { BattleSession } from '../models/battle-session';
import { Context } from '../../types';

const defaultCharacters = [
    Character.mk('ジョン', 19, 90, 15, 10),
    Character.mk('kiwi', 9, 147, 20, 30),
    Character.mk('カリーナ', 36, 125, 1, 5),
    Character.mk('抹茶', 22, 91, 1, 5),
    Character.mk('太郎', 30, 107, 1, 5),
    Character.mk('パルム', 6, 161, 1, 5),
];

export async function createBattleSession(ctx: Context) {
    const battleSessionRepo: Repository<BattleSession> = ctx.ports.battleSession;
    const characterRepo: Repository<Character> = ctx.ports.character;

    const charactersWithoutId: CharacterWithoutId[] = ctx.request.body;

    console.log(charactersWithoutId);

    const characters = await characterRepo.save(charactersWithoutId);

    const battleSession = new BattleSession();
    battleSession.characters = characters;
    battleSession.sessionName = 'test_session';

    const res = await battleSessionRepo.save(battleSession);

    return res;
}
