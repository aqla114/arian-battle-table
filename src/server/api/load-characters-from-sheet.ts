import * as Request from 'superagent';
import { Repository } from 'typeorm';
import { Character } from '../../types';
import { Character as CharacterModel } from '../models/character';
import { BattleSession } from '../models/battle-session';
import { Context } from '../types';

export async function loadCharactersFromSheet(ctx: Context) {
    const battleSessionRepo: Repository<BattleSession> = ctx.ports.battleSession;

    const req = ctx.request.body;
    const { guildId, characters: currentCharacters }: { guildId: string; characters: CharacterModel[] } = req;

    if (!guildId) {
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

    const response = await Request.get(`load-characters-server:8001/guild/${guildId}`).catch(err => err);

    if (!response || response.status !== 200) {
        console.error(`Unable to load characters from sheets. SheetID is ${guildId}`);
        return;
    }

    const characters = parseCharactersFromJson(response.body, currentCharacters);

    battleSession.characters = [...currentCharacters, ...characters];

    const res = await battleSessionRepo.save(battleSession);

    return res;
}

// load-character-server から飛んできたリクエストを Character の配列に変換する。
function parseCharactersFromJson(jsonBody: any, currentCharacters: CharacterModel[]): CharacterModel[] {
    if (!Array.isArray(jsonBody)) {
        return [];
    }

    const characters = jsonBody.map((x: Partial<Character>) => CharacterModel.mk(Character(x)));

    return characters;
}
