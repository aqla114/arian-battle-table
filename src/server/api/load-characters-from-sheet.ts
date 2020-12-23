import * as Request from 'superagent';
import { Character } from '../../types';
import { Character as CharacterModel } from '../models/character';
import { Context } from '../types';

export async function loadCharactersFromSheet(ctx: Context) {
    const req = ctx.request.body;
    const { guildId }: { guildId: string } = req;

    if (!guildId) {
        console.error('Bad request.');
        return;
    }

    const response = await Request.get(`load-characters-server:8001/guild/${guildId}`).catch(err => err);

    if (!response || response.status !== 200) {
        console.error(`Unable to load characters from sheets. SheetID is ${guildId}`);
        return;
    }

    const characters = parseCharactersFromJson(response.body);

    return { characters };
}

// load-character-server から飛んできたリクエストを Character の配列に変換する。
function parseCharactersFromJson(jsonBody: any): CharacterModel[] {
    if (!Array.isArray(jsonBody)) {
        return [];
    }

    const characters = jsonBody.map((x: Partial<Character>) => CharacterModel.mk(Character(x)));

    return characters;
}
