import { Character } from '../../types';
import { Character as CharacterModel } from '../models/character';
import { Character as grpcCharacter } from '../../../protogen/arianrod_pb';
import { Context } from '../types';

export async function loadCharactersFromSheet(ctx: Context) {
    const req = ctx.request.body;
    const { guildId }: { guildId: string } = req;

    if (!guildId) {
        console.error('Bad request.');
        return;
    }

    const response = await ctx.ports.grpcClient.getCharacterByGuildId(guildId);

    if (response === null) {
        console.error(`Unable to load characters from sheets. SheetID is ${guildId}`);
        return;
    }

    const characters = parseCharactersFromJson(response.charactersList);

    return { characters };
}

// TODO: この parser が API 内に定義されてるのかなり嘘という感じがするのでいい感じにしたい。
// load-character-server から飛んできたリクエストを Character の配列に変換する。
function parseCharactersFromJson(jsonBody: any): CharacterModel[] {
    if (!Array.isArray(jsonBody)) {
        return [];
    }

    const characters = jsonBody.map((x: grpcCharacter.AsObject) =>
        CharacterModel.mk(
            Character({
                ...x,
                maxHp: x.hp,
                defaultActionPriority: x.actionPriority,
                defaultPhysicalDefence: x.physicalDefence,
                defaultMagicalDefence: x.magicalDefence,
                skills: x.skillsList,
                attribute: 'None',
            }),
        ),
    );

    return characters;
}
